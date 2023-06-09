# Information Retrieval Project:

## Intro

It's a basic ir system which contain multiple `documents` and an `api` to `query` these `documents`, So that it returns in the `response` the most `relevant documents` to the `query` according to many metrics.

---

## Project Structure (Classes)

---

### Text Tokenizer

It is a class that contain the full logic of converting a `document` to a list of needed `terms` only.

It takes in the constructor
(`lang stopwords ,lang stemmer ,lang lemmatizer`)

It is contain a function that take a `text` as a param and returns a list of `terms`

---

### Document

It is a class that contain the full needed information of a `document` like:

- document `id`
- original `text`
- list of document's `terms`
- `vector` that represent the doc in `VSM`
- `counter` for each `term` in this `document`
- unique set of `terms`

---

### Datasets

It is a class that contain the logic that deal with `ir_datasets` library, which is used to load the `datasets` and pass them with their information (eg.. `language`, `stemmer`, `lemmatizer`, `stopwords`) to the constructor of `InvertedIndex`.

Also it has a function that takes the `query` and the `dataset` and call the corresponding `dataset` with the `query` to get the relative documents from that `dataset`

- Note: The `api` call this function, And this function call another function in `InvertedIndex` class.

---

### InvertedIndex

It is the main class in the application which contains:

- Data structure that represent the `inverted index` of a collection of `documents` and their `terms`.
- The `TF` ,`IDF` ,`TF_IDF` ,`VSM` and `queries` information.
- It is has 3 functions:

  1- build():

  - It takes the `dataset` and iterate over `documents` to build and fill the data structure with `dataset` information.

  2- lookup():

  - It take the `query` and calculate the `TF` ,`TF_IDF` and it's `vector` to represent it in the `VSM` and get the similar `documents` using `cos-similarity` in the `VSM`.

  3- evaluate():

  - It take the `query` and it's `result` to compare it with the true `result` in the `dataset` (we get the true `result` from `ir_datasets` library), And calculate some metrics that gives an evaluation for the `ir_system` like:
    - precision
    - recall
    - avp
    - map
    - mrr

---

## Languages, Frameworks & Libraries

    Front-end Application:
    - Javascript
    - ReactJs
    - TailwindCSS

    Back-end Application:
    - Python
    - FastAPI
    - NLTK
    - IR_datasets
    - Contractions

---

## Development Team

    - Lubna Alhindi
    - Ismail Alrifai
    - Mohammad Saadeh
    - Rahaf Hassoun Nasser
