# mmarco/fr
# mmarco/fr/dev
# mmarco/fr/train
# mmarco/fr/dev/small

import ir_datasets

# dataset = ir_datasets.load('mmarco/fr/dev')
# for i in dataset.qrels_iter():
#     print(i)

dataset = ir_datasets.load('mmarco/fr/dev')
for i in dataset.queries_iter():
    print(i)