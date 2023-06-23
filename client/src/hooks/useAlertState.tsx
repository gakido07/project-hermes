import { useWrappedReducer } from '@projecthermes/client/hooks/useWrappedReducer';
import {
  AlertReducer,
  alertReducerInitialState,
} from '@projecthermes/client/reducers/AlertReducer';
import { AlertSeverity } from '@projecthermes/client/common/types';

export function useAlertState() {
  const [state, dispatch] = useWrappedReducer(
    AlertReducer,
    alertReducerInitialState,
  );
  const showAlert = ({
    message,
    severity,
  }: {
    message: string;
    severity: AlertSeverity;
  }) => {
    dispatch({
      open: true,
      message,
      severity,
    });
  };

  const hideAlert = () => {
    dispatch({
      open: false,
    });
  };
  return { state, showAlert, hideAlert };
}
