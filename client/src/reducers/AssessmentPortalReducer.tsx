import { generatePatchedReducer } from '@projecthermes/client/lib/react';
import { AssessmentAttemptEntity } from '@projecthermes/theorygrader/assessment/entities/assessment.attempt';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { AssessmentPortalQuestion } from '@projecthermes/core/dto/assessment.portal.question';

export type AssessmentPortalReducerType = {
  attempt: AssessmentAttemptEntity;
  questions: AssessmentPortalQuestion[];
  assessment: AssessmentEntity;
};

export const AssessmentPortalReducer =
  generatePatchedReducer<AssessmentPortalReducerType>();
