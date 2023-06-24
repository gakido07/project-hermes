from pydantic import BaseModel


class TextSimilarityDto(BaseModel):
  text1: str
  text2: str
