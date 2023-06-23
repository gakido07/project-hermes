import { Alert as MantineAlert, Transition } from '@mantine/core';
import { useContext } from 'react';
import { AlertContext } from '@projecthermes/client/context/AlertContext';

export function Alert() {
  const {
    state: { message, open },
    hideAlert,
  } = useContext(AlertContext);
  const hideAlertWithTransition = () => {
    setTimeout(hideAlert, 2000);
  };
  return (
    <Transition
      transition="slide-right"
      timingFunction="cubic-bezier(5,0,1,1)"
      duration={400}
      mounted={open}
      onEntered={hideAlertWithTransition}
    >
      {styles => (
        <MantineAlert
          sx={{
            position: 'absolute',
            top: '0.5rem',
            width: 'fit-content',
            height: 'fit-content',
            minWidth: '20%',
            left: '2%',
          }}
          style={styles}
          withCloseButton
          onClose={hideAlertWithTransition}
        >
          {message}
        </MantineAlert>
      )}
    </Transition>
  );
}
