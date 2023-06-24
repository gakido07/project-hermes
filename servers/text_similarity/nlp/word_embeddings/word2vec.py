from nltk.tokenize import sent_tokenize, word_tokenize

from gensim.models import KeyedVectors, Word2Vec
from scipy import spatial
import os


def initialize_word2vec_model():
  root = os.path.dirname(os.getcwd())
  path = os.path.join(
      root,
      "dataset",
      "word2vec-google-news-300/word2vec-google-news-300.gz"
  )
  keyed_vectors = KeyedVectors.load_word2vec_format(
      path,
      binary=True
  )
  model = Word2Vec()
  model.wv = keyed_vectors
  return model


def get_word2vec_embeddings_of_sentence(text: str):
  sentences = sent_tokenize(text.lower())
  vectors = []
  model = initialize_word2vec_model()
  for sentence in sentences:
    tokens = word_tokenize(sentence)
    vectors.extend([
        model.wv[token] for token in tokens if token in model.wv
    ])
  return sum(vectors) / len(vectors)


def compute_cosine_similarity(sample: str, text: str):
  sample_vector = get_word2vec_embeddings_of_sentence(sample)
  text_vector = get_word2vec_embeddings_of_sentence(text)
  return spatial.distance.cosine(sample_vector, text_vector)


def compute_text_similarity_in_percentage(sample: str, text: str):
  return (1 - compute_cosine_similarity(sample, text)) * 100
