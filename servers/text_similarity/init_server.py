from fastapi import FastAPI
from dto.text_similarity_dto import TextSimilarityDto, TextSimilarityRequestBody
from nlp.main import getTextSimilarityFromDto
from nlp.word_embeddings.use import get_similarity
app = FastAPI()


@app.get("/")
async def root():
  return {"message": "Theory grader model api"}


@app.post('/text-similarity')
async def compareAnswers(dto: TextSimilarityRequestBody):
  print('received')
  result = list(map(getTextSimilarityFromDto, dto.dtos))
  print(result)
  return {"request": result}
