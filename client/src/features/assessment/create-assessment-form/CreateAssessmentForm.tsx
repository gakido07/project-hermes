import { FormEvent, useContext, useState } from 'react';
import { NumberInput, Textarea, TextInput } from '@mantine/core';
import styles from './create.assessment.module.scss';
import { useForm } from 'react-hook-form';
import { DateInput } from '@mantine/dates';
import {
  descriptionFieldOptions,
  durationFieldOptions,
  nameFieldValidation,
} from '@projecthermes/client/features/assessment/assessment.util';
import { AssessmentEntity } from '@projecthermes/theorygrader/assessment/entities/assesment.entity';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@projecthermes/client/config/api';
import { Button } from '@projecthermes/client/components/button/Button';
import { CreateAssessmentDto } from '@projecthermes/core/dto';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { CtapContext } from '@projecthermes/client/context/CtapContext';
import { AssessmentDto } from '@projecthermes/core/dto/assessment.dto';

enum CreateAssessmentFormFields {
  NAME = 'name',
  DESCRIPTION = 'description',
}

interface props {
  openPrompt: () => void;
  assessment?: AssessmentEntity | AssessmentDto | CreateAssessmentDto;
}

export function CreateAssessmentForm({ openPrompt }: props) {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('edit');
  const assessmentId: number = Number.parseInt(searchParams.get('id'));
  const { showAlert } = useContext(AlertContext);
  const { dispatch } = useContext(CtapContext);
  // I know why I did this
  const editState = !!key && !!assessmentId;
  const { data } = useQuery({
    queryFn: () => api.handleSuccessfulAuth(''),
    enabled: editState,
  });
  const handleSuccess = (response: any) => {
    dispatch({
      assessment: response.data,
    });
    showAlert({
      message: 'Assessment created',
      severity: 'success',
    });
    openPrompt();
  };
  const handleError = () => {
    showAlert({
      message: 'Error occured while creating assessment',
      severity: 'error',
    });
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: (requestBody: CreateAssessmentDto) =>
      api.createAssessment(requestBody),
    mutationKey: ['create_assessment'],
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const onSubmit = async data => mutate(data);
  const assessmentToBeEdited: AssessmentEntity = data?.data || null;
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateAssessmentDto>();
  const evaluateDeadlineMinDate = () => {
    const startTimeValue = getValues('startTime');
    return startTimeValue ? new Date(startTimeValue) : new Date();
  };
  return (
    <form
      className={styles.createAssessmentForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Name</label>
      <TextInput
        label="Name of your assessment"
        placeholder="Introduction to Economics"
        withAsterisk
        defaultValue={assessmentToBeEdited?.name}
        {...register('name', nameFieldValidation)}
      />
      <label>Duration</label>
      <NumberInput
        label="Duration in minutes"
        withAsterisk
        required
        onChange={value =>
          setValue('duration', Number.parseInt(value.toString()))
        }
      />
      <label>Description</label>
      <Textarea
        label="Description of your assessment"
        placeholder="15329 Huston 21st"
        withAsterisk
        {...register('description', descriptionFieldOptions)}
      />
      <label>Start time</label>
      <DateInput
        defaultValue={new Date()}
        withAsterisk
        label="Exact time assessment should start"
        minDate={new Date()}
        required
        onChange={value => setValue('startTime', value.toISOString())}
      />
      <label>Deadline</label>
      <DateInput
        defaultValue={new Date()}
        label="Exact time assessment should end"
        minDate={evaluateDeadlineMinDate()}
        required
        onChange={value => setValue('deadline', value.toISOString())}
      />
      <Button loading={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
}
