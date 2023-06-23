import { Question } from 'core/models/question';
import { QuestionEntity } from 'servers/theory-grader/src/assessment/entities/question.entity';

export class TheoryAssessment {
  deadline: Date;
  name: string;
  organizerId: number;
  questions: Question[] | Promise<QuestionEntity[]>;
  description: string;
  startTime: Date;
  key: string;
  duration: number;
}
