from nltk import pos_tag
from nltk import download
from nltk.stem import PorterStemmer


def initialize_stop_words():
  return download("stopwords")


def filter_stop_words(tokens: list[str]):
  stop_words = initialize_stop_words()
  filteredList = []
  for token in tokens:
    if token.casefold() not in stop_words:
      filteredList.append(token)
  return filteredList


def stem(tokens: list[str]):
  stemmer = PorterStemmer()
  return [stemmer.stem(token) for token in tokens]


def tag_part_of_speech(tokens: list[str]):
  return pos_tag(tokens)
