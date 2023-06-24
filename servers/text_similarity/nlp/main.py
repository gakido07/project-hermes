from collections import OrderedDict
import torch
from nlp.word_embeddings.bert import get_bert_embeddings, compute_similarity


class SentenceSimilarityCalculator():
  sentence1: str
  sentence2: str

  def __init__(self, sentence1: str, sentence2: str):
    self.sentence1 = sentence1
    self.sentence2 = sentence2

  def withBert(self):
    embeddings1 = get_bert_embeddings(self.sentence1)
    embeddings2 = get_bert_embeddings(self.sentence2)
    return compute_similarity(embeddings1, embeddings2)
