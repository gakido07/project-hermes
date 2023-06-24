from fastapi import FastAPI
from nlp.main import SentenceSimilarityCalculator
from dto.text_similarity_dto import TextSimilarityDto

app = FastAPI()


@app.get("/")
async def root():
  return {"message": "Theory grader model api"}


@app.post('/text-similarity')
async def compareAnswers(dto: TextSimilarityDto):
  text_similarity_calculator = SentenceSimilarityCalculator(
      dto.text1, dto.text2)
  similarity = text_similarity_calculator.withBert()
  print(similarity.numpy())
  return {"request": similarity}
