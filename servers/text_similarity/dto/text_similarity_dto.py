from typing import Optional
from pydantic import BaseModel


class TextSimilarityDto(BaseModel):
  texts: list[str]
  answerId: str
  similarityValue: float


class TextSimilarityRequestBody(BaseModel):
  dtos: list[TextSimilarityDto]
