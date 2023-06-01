import ir_datasets

dataset = ir_datasets.load('lotte/lifestyle/test/search')

for i in dataset.qrels_iter():
    print(i)