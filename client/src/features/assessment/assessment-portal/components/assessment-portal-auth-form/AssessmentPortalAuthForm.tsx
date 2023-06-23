import { Sx, TextInput } from '@mantine/core';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AttemptDto } from '@projecthermes/core/dto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@projecthermes/client/config/api';
import { useForm } from 'react-hook-form';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AssessmentAttempt } from '@projecthermes/core/models';
import styles from './assessment.portal.auth.form.module.scss';
import {
  matricNoFieldOptions,
  studentNameFieldOptions,
} from '@projecthermes/client/features/assessment/assessment.util';
import { Button } from '@projecthermes/client/components/button/Button';
import { AxiosResponse } from 'axios';
import { AssessmentPortalContext } from '@projecthermes/client/context/AssessmentReducerContext';
import { AssessmentPortalDto } from '@projecthermes/core/dto/assessment.portal.dto';
import { BeginAttemptDto } from '@projecthermes/core/dto/begin.attempt.dto';

const inputSx: Sx = {
  width: '80%',
  margin: 'auto',
};

export function AssessmentPortalAuthForm() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);
  const { dispatch } = useContext(AssessmentPortalContext);
  const handleVerifySuccess = (response: AxiosResponse<any, any>) => {
    if (!response.data?.exists) {
      showAlert({
        message: 'Invalid key',
        severity: 'error',
      });
      return navigate('/');
    }
  };
  useQuery({
    queryFn: () => api.verifyAssessmentKey(key),
    queryKey: ['assessment_list'],
    onSuccess: handleVerifySuccess,
  });
  const handleSuccess = (response: AxiosResponse<any, any>) => {
    const data = response.data as AssessmentPortalDto;
    dispatch({
      attempt: data.assessmentAttempt,
      questions: data.questions,
      assessment: data.assessment,
    });
    showAlert({
      message: 'Authentication Successful',
      severity: 'success',
    });
  };
  const handleError = error => {
    showAlert({
      message: error?.message || 'Error occured',
      severity: 'error',
    });
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BeginAttemptDto) => api.beginAttempt(key, body),
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    data.matricNo = Number(data.matricNo);
    mutate(data);
  };
  return (
    <form
      className={styles.assessmentPortalAuthForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Name</label>
      <TextInput sx={inputSx} {...register('name', matricNoFieldOptions)} />
      <label>Matric No</label>
      <TextInput
        sx={inputSx}
        {...register('matricNo', studentNameFieldOptions)}
      />
      <Button loading={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
}
