import { ReactHookFormRegisterOptions } from '@projecthermes/client/lib/react-hook-form';

export const nameFieldValidation: ReactHookFormRegisterOptions = {
  required: true,
  maxLength: {
    value: 20,
    message: 'Max length',
  },
  minLength: {
    value: 3,
    message: 'Min length',
  },
};

export const descriptionFieldOptions: ReactHookFormRegisterOptions = {
  minLength: {
    value: 4,
    message: 'Minlength should be ',
  },
  required: {
    value: true,
    message: 'Your assessment will need a description',
  },
  maxLength: {
    value: 600,
    message: 'assessment too long',
  },
};

export const durationFieldOptions: ReactHookFormRegisterOptions = {
  min: {
    value: 4,
    message: 'Assessment duration need to be longer than four minutes',
  },
  required: true,
};

export const matricNoFieldOptions: ReactHookFormRegisterOptions = {
  required: true,
  minLength: {
    value: 9,
    message: 'Invalid matric Number',
  },
};

export const studentNameFieldOptions: ReactHookFormRegisterOptions = {
  required: true,
};

export const startTimeOptions: ReactHookFormRegisterOptions = {};

export const questionTextOptions: ReactHookFormRegisterOptions = {
  required: true,
  minLength: {
    value: 10,
    message: 'Question is too short',
  },
};
