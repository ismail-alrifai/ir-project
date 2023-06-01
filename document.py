class Document:
    def __init__(self, doc_id, text, terms):
        self.doc_id = doc_id
        self.terms = terms
        self.text = text
        self.vec = []
    
    def setVec(self ,vec):
        self.vec = vec