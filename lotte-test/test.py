import ir_datasets

dataset = ir_datasets.load('mmarco/fr/dev/small')
print(dataset.docs_path())
print(dataset.docs)
n = 0
for i in dataset.docs_iter():
    n += 1
print(n)


perfect_query = 529