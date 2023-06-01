from nltk.stem.snowball import EnglishStemmer 
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import ir_datasets

from inverted_index import InvertedIndex

class Datasets:
    def __init__(self):
        self.ID1 = InvertedIndex(
            ir_datasets.load('lotte/lifestyle/test/search'),
            " .!?,@/\#~:;'\"",
            stopwords.words('english'),
            EnglishStemmer(),
            WordNetLemmatizer()
        )

        self.ID1.build()

    def query(self ,dataset ,query):
        if dataset == 'lotte/lifestyle':
            return self.ID1.lookup(query)
        elif dataset == 'lotte/lifestyle':
            return self.ID2.lookup(query)
        else:
            return None