import 'reflect-metadata';
import { Router } from '@projecthermes/client/router/Router';
import { MantineProvider } from '@mantine/core';
import { themeOverrides } from '@projecthermes/client/lib/mantine';
import { useAlertState } from '@projecthermes/client/hooks/useAlertState';
import { AlertContext } from '@projecthermes/client/context/AlertContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Alert } from '@projecthermes/client/components/alert/Alert';

const queryClient = new QueryClient();

function App() {
  const alertState = useAlertState();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={themeOverrides}>
        <AlertContext.Provider value={alertState}>
          <Router />
          <Alert />
        </AlertContext.Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
