import { generatePatchedReducer } from '@projecthermes/client/lib/react';
import { AlertReducerType } from '@projecthermes/client/reducers/AlertReducer';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import {
  CreateAssessmentDto,
  CreateQuestionDto,
} from '@projecthermes/core/dto';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';

export type CtapReducerType = {
  assessment: AssessmentEntity | CreateAssessmentDto;
  questions: (QuestionEntity | CreateQuestionDto)[];
  editQuestions: boolean;
};

export const CtapReducer = generatePatchedReducer<CtapReducerType>();
