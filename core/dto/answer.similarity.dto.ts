import { SimilarityDto } from 'core/dto/similarity.dto';

export class AnswerSimilarityDto extends SimilarityDto {
  answerId: number;

  constructor(answerId: number, text1: string, text2: string) {
    super();
    this.answerId = answerId;
    this.text1 = text1;
    this.text2 = text2;
    this.similarityPercentage = null;
  }
}
