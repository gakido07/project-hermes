import { Reducer } from 'react';
import { Action, AlertSeverity } from '@projecthermes/client/common/types';

export interface AlertReducerType {
  message: string;
  severity: AlertSeverity;
  open: boolean;
}

export const alertReducerInitialState: AlertReducerType = {
  message: '',
  severity: 'error',
  open: false,
};

export const AlertReducer: Reducer<
  AlertReducerType,
  Action<AlertReducerType>
> = (state, action) => {
  switch (action.type) {
    case 'MUTATE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
