import styles from './assessment.portal.questions.module.scss';
import { AssessmentPortalContext } from '@projecthermes/client/context/AssessmentReducerContext';
import { useContext, useState } from 'react';
import { Button } from '@projecthermes/client/components/button/Button';
import { AssessmentPortalQuestion } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-question/AssessmentPortalQuestion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@projecthermes/client/config/api';
import { evaluateTimeDifference } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/logic';
import { ConfirmationModal } from '@projecthermes/client/components/modals/confirmation-modal/ConfirmationModal';
import axios from 'axios';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { useNavigate } from 'react-router-dom';

export function AssessmentPortalQuestions() {
  const {
    state: { assessment, questions, attempt },
  } = useContext(AssessmentPortalContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: () =>
      api.finishAttempt(assessment.id, {
        attemptId: assessment.id,
        matricNo: attempt.matricNo,
      }),
    mutationKey: ['finish-attempt'],
  });
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleFinishButtonClick = () => {
    const { value } = evaluateTimeDifference(new Date(assessment.deadline));
    if (value <= 0) {
      setDialogOpen(true);
    }
    mutate();
    showAlert({
      message: 'Assessment successfully submitted',
      severity: 'success',
    });
    navigate('/');
  };
  const handleAgree = async () => {
    mutate();
  };

  return (
    <div className={styles.assessmentPortalQuestions}>
      <h1>{assessment?.name}</h1>
      {questions.map((question, index) => (
        <AssessmentPortalQuestion question={question} index={index} />
      ))}
      <ConfirmationModal
        open={dialogOpen}
        setOpen={setDialogOpen}
        onAgree={handleAgree}
      >
        <p>Are you sure you want to finish attempt</p>
      </ConfirmationModal>
      <Button loading={isLoading} onClick={handleFinishButtonClick}>
        Finish Attempt
      </Button>
    </div>
  );
}
