from nltk.tokenize import word_tokenize
from collections import defaultdict
import contractions
import math

from document import Document

class InvertedIndex:
    def __init__(self, dataset, stripChars, stopwords=None ,stemmer=None, lemmatizer=None):
        self.tf = {}
        self.idf = {}
        self.tf_idf = {}
        self.sumRR = 0.0
        self.sumAvp = 0.0
        self.queryCnt = 0
        self.documents = {}
        self.threshold = 0.5
        self.stemmer = stemmer
        self.dataset = dataset
        self.stripChars = stripChars
        self.lemmatizer = lemmatizer
        self.stopwords = set(stopwords)
        self.invertedIndex = defaultdict(list)

    def allInOne(self):
        for doc in self.dataset.docs_iter():
            self.documents[doc.doc_id] = Document(doc.doc_id ,doc.text ,self.tokenizeDocument(doc.text))


    def build(self):
        for doc in self.dataset.docs_iter():
            self.addToInvertedIndex(Document(doc.doc_id ,doc.text ,self.tokenizeDocument(doc.text)))
            if doc.doc_id == '1000':
                break
        self.calcIDF()
        self.calcTF_IDF()
        self.calcVSM()
        print('Inverted Index: Build Successfully.')

    def addToInvertedIndex(self, document):
        for term in set(document.terms):
            self.invertedIndex[term].append(document.doc_id)
        self.documents[document.doc_id] = document
        self.addToTF(document)
    
    def addToTF(self ,document):
        for term in set(document.terms):
            if term not in self.tf.keys():
                self.tf[term] = {}
            self.tf[term][document.doc_id] = self.getTF(term ,document.terms)
    
    def getTF(self ,term ,terms):
        return math.log(1 + terms.count(term) / len(terms))
     
    def calcTF_IDF(self):
        for term ,docFrequency in self.tf.items():
            if term not in self.tf_idf.keys():
                self.tf_idf[term] = {}
            for doc_id ,tf in docFrequency.items():
                self.tf_idf[term][doc_id] = self.getTF_IDF(tf ,self.idf[term])

    def getTF_IDF(self ,tf ,termIDF):
        return tf * termIDF

    def calcIDF(self):
        n_docs = len(self.documents)
        for term ,doc_ids in self.invertedIndex.items():
            self.idf[term] = math.log(n_docs / len(doc_ids))
       
    def calcVSM(self):
        for doc_id in self.documents:
            vec = []
            for term in self.invertedIndex.keys():
                if doc_id not in self.tf_idf[term].keys():
                    vec.append(0)
                else:
                    vec.append(self.tf_idf[term][doc_id])
            self.documents[doc_id].setVec(vec)

    def initQuery(self, query):
        queryTF = {}
        for term in set(query.terms):
            queryTF[term] = self.getTF(term ,query.terms)

        queryTF_IDF = {}
        for term in set(query.terms):
            if term not in self.idf.keys():
                queryTF_IDF[term] = self.getTF_IDF(queryTF[term] ,0)
            else:
                queryTF_IDF[term] = self.getTF_IDF(queryTF[term] ,self.idf[term])

        vec = []
        for term in self.invertedIndex.keys():
            if term not in query.terms:
                vec.append(0)
            else:
                vec.append(queryTF_IDF[term])
        query.setVec(vec)
        return query

    def evaluateQuery(self ,irsResult ,query):
        queryId = 0
        for query_id ,text in self.dataset.queries_iter():
            if query == text:
                queryId = query_id
                break

        datasetResult = []
        for query_id, doc_id, relevance, iteration in self.dataset.qrels_iter():
            if query_id == queryId:
                datasetResult.append(doc_id)

        precisionSum = 0.0
        numRelevantRetrieved = 0
        numRetrieved = len(irsResult)
        numRelevant = len(datasetResult)

        firstRelevantIsFound = False
        for i ,res in enumerate(irsResult):
            if res['doc_id'] in datasetResult:
                if not firstRelevantIsFound:
                    self.sumRR += 1.0 / (i + 1.0)
                    firstRelevantIsFound = True
                numRelevantRetrieved += 1
                precisionSum += numRelevantRetrieved / (i + 1)

        precision = numRelevantRetrieved / numRetrieved
        recall = numRelevantRetrieved / numRelevant
        avp = precisionSum / numRelevantRetrieved
        self.queryCnt += 1
        self.sumAvp += avp
        mapVal = self.sumAvp / self.queryCnt
        mrr = self.sumRR / self.queryCnt

        #TODO: MRR

        return {
            "precision": precision,
            "recall": recall,
            "avp": avp,
            "map": mapVal,
            "mrr": mrr
        }

    def lookup(self ,inputQuery):
        query = self.initQuery(Document(1, inputQuery ,self.tokenizeDocument(inputQuery)))

        sim = {}
        for document in self.documents.values():
            termsIntersection = []
            for term in set(query.terms):
                if term in document.terms:
                    termsIntersection.append(term)
            
            sumDocTF_IDF_2 = 0.0
            for term in set(document.terms):
                sumDocTF_IDF_2 += (self.tf_idf[term][document.doc_id] * self.tf_idf[term][document.doc_id])

            sim[document.doc_id] = 0.0
            for term in termsIntersection:
                sim[document.doc_id] += self.tf_idf[term][document.doc_id] / math.sqrt(sumDocTF_IDF_2)
        
        def sortFunction(doc):
            return sim[doc.doc_id]

        sortedDocs = list(self.documents.values())
        sortedDocs.sort(reverse=True,key=sortFunction)

        irsResult = []
        for doc in sortedDocs:
            if sim[doc.doc_id] >= self.threshold:
                irsResult.append({
                    "doc_id": doc.doc_id,
                    # "text": doc.text
                })

        return {
            "irsResult": irsResult,
            "evaluation": self.evaluateQuery(irsResult ,inputQuery)
        }
    
    def tokenizeDocument(self, doc):
        text = doc
        text = text.lower().strip(self.stripChars)
        text = contractions.fix(text)
        text = text.replace('`' ,"'")
        text = text.replace('"' ,"'")
        wordTokens = word_tokenize(text)

        filteredText = []
        for word in wordTokens:
            if word not in self.stopwords:
                filteredText.append(word)

        stemmedText = []
        for word in filteredText:
            stemmedText.append(self.stemmer.stem(word))

        lemmatizedText = []
        for word in stemmedText:
            lemmatizedText.append(self.lemmatizer.lemmatize(word))

        return lemmatizedText
    
