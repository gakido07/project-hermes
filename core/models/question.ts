import { TheoryAssessment } from 'core/models/theory.assessment';

export class Question {
  sampleAnswer: string;
  number: number;
  score: number;
  assessment: TheoryAssessment;
}
