import { QuestionEntity } from 'servers/theory-grader/src/assessment/entities/question.entity';

export class AssessmentPortalQuestion {
  readonly id: number;

  number: number;

  score: number;

  text: string;

  constructor({ id, number, score, text }: QuestionEntity) {
    this.id = id;
    this.number = number;
    this.score = score;
    this.text = text;
  }
}
