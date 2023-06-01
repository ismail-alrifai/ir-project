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
        self.documents = {}
        self.stemmer = stemmer
        self.dataset = dataset
        self.stripChars = stripChars
        self.lemmatizer = lemmatizer
        self.stopwords = set(stopwords)
        self.invertedIndex = defaultdict(list)

    def build(self):
        for doc in self.dataset.docs_iter():
            self.addToInvertedIndex(Document(doc.doc_id ,doc.text ,self.tokenizeDocument(doc.text)))
            if doc.doc_id == '500':
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

    def lookup(self ,inputQuery):
        query = self.initQuery(Document(1, inputQuery ,self.tokenizeDocument(inputQuery)))
        
        sim = {}
        for document in self.documents.values():
            termsIntersection = []
            for term in set(query.terms):
                if term in document.terms:
                    termsIntersection.append(term)
            
            sumDocTF_IDF_2 = 0
            for term in set(document.terms):
                sumDocTF_IDF_2 += (self.tf_idf[term][document.doc_id] ** 2)

            sim[document.doc_id] = 0
            for term in termsIntersection:
                sim[document.doc_id] += self.tf_idf[term][document.doc_id] / math.sqrt(sumDocTF_IDF_2)
        
        def sortFunction(doc):
            return sim[doc.doc_id]

        sortedDocs = list(self.documents.values())
        sortedDocs.sort(reverse=True,key=sortFunction)

        response = []
        for doc in sortedDocs:
            response.append({
                "doc_id": doc.doc_id,
                "text": doc.text
            })

        return response
    
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
    