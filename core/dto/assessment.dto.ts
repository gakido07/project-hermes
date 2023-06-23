import { TheoryAssessment } from '@projecthermes/core/models';
import { AssessmentEntity } from 'servers/theory-grader/src/assessment/entities/assesment.entity';
import { QuestionEntity } from 'servers/theory-grader/src/assessment/entities/question.entity';

export class AssessmentDto extends TheoryAssessment {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  link: string;
  __questions__: QuestionEntity[];

  constructor(
    id: number,
    createdAt: Date | string,
    updatedAt: Date | string,
    link: string,
  ) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.link = link;
  }

  static fromEntity(assessmentEntity: AssessmentEntity) {
    return {
      ...assessmentEntity,
      link: `${process.env.CLIENT_BASE_URL}/assessments/attempt?key=${assessmentEntity.key}`,
    };
  }
}
