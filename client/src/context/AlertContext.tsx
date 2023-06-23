import { createContext } from 'react';
import { AlertReducerType } from '@projecthermes/client/reducers/AlertReducer';
import { AlertSeverity } from '@projecthermes/client/common/types';

export const AlertContext = createContext<{
  state: AlertReducerType;
  showAlert: (args: { message: string; severity: AlertSeverity }) => void;
  hideAlert: () => void;
}>(null);
