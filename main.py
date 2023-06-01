from fastapi import FastAPI

from dataset import Datasets

ds = Datasets()

app = FastAPI()

@app.get("/query")
def read_root(dataset: str ,query: str):
    return {"result" : ds.query(dataset ,query)}
    