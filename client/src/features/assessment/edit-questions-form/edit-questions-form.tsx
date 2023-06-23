import { FormEvent, Fragment, useContext, useState } from 'react';
import { NumberInput, Textarea } from '@mantine/core';
import { Button } from '@projecthermes/client/components/button/Button';
import { CreateQuestionDto } from '@projecthermes/core/dto';
import { QuestionEntity } from '@projecthermes/theorygrader/assessment/entities/question.entity';
import { useForm } from 'react-hook-form';
import styles from './edit.questions.form.module.scss';
import { ReactComponent as PlusSvg } from '@projecthermes/client/assets/svgs/plus.svg';
import { api } from '@projecthermes/client/config/api';
import { CtapContext } from '@projecthermes/client/context/CtapContext';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { questionTextOptions } from '@projecthermes/client/features/assessment/assessment.util';
import { AlertContext } from '@projecthermes/client/context/AlertContext';

interface props {
  questionsToBeEdited: (QuestionEntity | CreateQuestionDto)[];
}

export function EditQuestionsForm({ questionsToBeEdited }: props) {
  const { state } = useContext(CtapContext);
  const { showAlert } = useContext(AlertContext);
  const [questions, setQuestions] = useState<
    (CreateQuestionDto | QuestionEntity)[]
  >(questionsToBeEdited || [null]);
  const { register, handleSubmit, setValue } = useForm();
  const [page, setPage] = useState<number>(1);
  const goToPreviousPage = () =>
    setPage(state => (state > 1 ? state - 1 : state));
  const addQuestionSlot = () => setQuestions([...questions, null]);
  const goToNextPage = () => setPage(state => (state < 3 ? state + 1 : state));
  const onSubmit = async data => {
    try {
      console.log(data);
      const assessment = state.assessment as AssessmentEntity;
      await api.createQuestion(assessment.id, data);
    } catch (error) {
      showAlert({
        message: 'error submitting questions',
        severity: 'error',
      });
    }
  };
  return (
    <form className={styles.editQuestions} onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question, index) => (
        <Fragment key={index}>
          <label>Question {index + 1}</label>
          <Textarea
            label="Question"
            withAsterisk
            required
            defaultValue={question?.text}
            {...register(`questions.${index}.text`, questionTextOptions)}
          />
          <label>Score</label>
          <NumberInput
            value={question?.score}
            label="Score of question"
            withAsterisk
            required
            hideControls
            onChange={value => setValue(`questions.${index}.score`, value)}
          />
          <label>Answer</label>
          <Textarea
            label="Sample answer to be used to grade other answers"
            withAsterisk
            required
            defaultValue={question?.sampleAnswer}
            {...register(`questions.${index}.sampleAnswer`)}
          />
        </Fragment>
      ))}
      <div className={styles.buttonContainer}>
        <Button
          onClick={addQuestionSlot}
          className={styles.addQuestionButton}
          type="button"
        >
          <PlusSvg /> Add Question
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
