from dto.text_similarity_dto import TextSimilarityDto
from nlp.word_embeddings.use import get_similarity


def getTextSimilarityFromDto(similarityDto: TextSimilarityDto):
  similarityDto.similarityValue = get_similarity(similarityDto.texts)[
      0][1].item()
  return similarityDto
