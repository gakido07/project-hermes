from sentence_transformers import SentenceTransformer, util
from torch import Tensor, embedding
from util import convert_cosine_similarity_to_percentage

model = SentenceTransformer('all-mpnet-base-v2')


def get_bert_embeddings(text):
  sentences = [text]
  return model.encode(sentences, convert_to_tensor=True)


def compute_similarity(embeddings1: list[Tensor], embeddings2: list[Tensor]):
  return util.cos_sim(embeddings1, embeddings2)


embedding1 = get_bert_embeddings(
    'The bisection method is an approximation method to find the roots of the given equation by repeatedly dividing the interval. This method will divide the interval until the resulting interval is found, which is extremely small.'
)
embedding2 = get_bert_embeddings(
    'Bisection method is an approximate method of finding the root of the equation through iterative process')

print(embedding1)
print(embedding2)

similarity = compute_similarity(embedding1, embedding2).numpy()[0][0]
print(similarity)
print(convert_cosine_similarity_to_percentage(similarity))
