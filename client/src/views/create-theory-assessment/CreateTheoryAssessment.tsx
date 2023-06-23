import { NestedHomeLayout } from '@projecthermes/client/components/layouts/nested-home-layout/NestedHomeLayout';
import { CreateAssessmentForm } from '@projecthermes/client/features/assessment/create-assessment-form/CreateAssessmentForm';
import { EditQuestionsForm } from '@projecthermes/client/features/assessment/edit-questions-form/edit-questions-form';
import { CtapReducer } from '@projecthermes/client/reducers/CtaxReducer';
import { CtapContext } from '@projecthermes/client/context/CtapContext';
import { Back } from '@projecthermes/client/components/back/Back';
import { AddQuestionsPrompt } from '@projecthermes/client/features/assessment/add-question-prompt/AddQuestionsPrompt';
import { useWrappedReducer } from '@projecthermes/client/hooks/useWrappedReducer';
import { useDisclosure } from '@mantine/hooks';
import { useLocation, useSearchParams } from 'react-router-dom';

export function CreateTheoryAssessment() {
  const [searchParams] = useSearchParams();
  const { state: locationState } = useLocation();
  console.log(locationState);
  const [state, dispatch] = useWrappedReducer(CtapReducer, {
    assessment: locationState,
    questions: locationState?.__questions__ || [],
    editQuestions: searchParams.get('edit-questions') === 'true',
  });
  const [opened, controls] = useDisclosure(false);
  const { assessment, questions, editQuestions } = state;
  return (
    <CtapContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <NestedHomeLayout>
        <Back />
        <AddQuestionsPrompt opened={opened} controls={controls} />
        {editQuestions ? (
          <h1>Create/ Edit Questions</h1>
        ) : (
          <h1>Create Assessment</h1>
        )}
        {editQuestions ? (
          <EditQuestionsForm questionsToBeEdited={questions} />
        ) : (
          <CreateAssessmentForm
            assessment={assessment}
            openPrompt={controls.open}
          />
        )}
      </NestedHomeLayout>
    </CtapContext.Provider>
  );
}
