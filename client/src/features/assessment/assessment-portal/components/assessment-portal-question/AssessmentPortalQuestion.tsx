import { useContext, useState } from 'react';
import { AssessmentPortalQuestion as AssessmentPortalQuestionDto } from '@projecthermes/core/dto/assessment.portal.question';
import { Textarea } from '@mantine/core';
import { ReactComponent as CheckSvg } from '@projecthermes/client/assets/svgs/check.svg';
import styles from './assessment.portal.question.module.scss';
import { api } from '@projecthermes/client/config/api';
import { AssessmentPortalContext } from '@projecthermes/client/context/AssessmentReducerContext';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { RecordAnswerRequestDto } from '@projecthermes/core/dto';

interface props {
  question: AssessmentPortalQuestionDto;
  index: number;
}

export function AssessmentPortalQuestion({ question, index }: props) {
  const [answer, setAnswer] = useState<string>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { showAlert } = useContext(AlertContext);
  const submitButtonDisabled = !answer || submitting;
  const handleChange = event => setAnswer(event.target.value);
  const {
    state: { attempt },
  } = useContext(AssessmentPortalContext);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.recordAnswer(
        question.id,
        new RecordAnswerRequestDto(answer, attempt.matricNo, attempt.id),
      );
      showAlert({
        message: 'Answer submitted',
        severity: 'success',
      });
    } catch (error) {
      showAlert({
        message: 'Error while submitting answer',
        severity: 'error',
      });
    }
    setSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.assessmentPortalQuestion}>
      <p>{`${index + 1}. ${question.text}`}</p>
      <Textarea
        sx={{
          height: 'fit-content',
        }}
        withAsterisk
        onChange={handleChange}
      />
      <button disabled={submitButtonDisabled}>
        <CheckSvg />
      </button>
    </form>
  );
}
