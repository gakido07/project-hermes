import { AssessmentEntity } from 'servers/theory-grader/src/assessment/entities/assesment.entity';
import { AssessmentAttemptEntity } from 'servers/theory-grader/src/assessment/entities/assessment.attempt';
import { AssessmentPortalQuestion } from 'core/dto/assessment.portal.question';

export class AssessmentPortalDto {
  assessment: AssessmentEntity;
  questions: AssessmentPortalQuestion[];
  assessmentAttempt: AssessmentAttemptEntity;
}
