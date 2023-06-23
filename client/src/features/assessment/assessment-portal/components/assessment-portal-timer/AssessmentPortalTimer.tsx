import { ReactNode } from 'react';
import styles from './assessment.portal.timer.module.scss';
import { padDigit } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/logic';
import { useTimer } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/hooks/useTimer';

interface props {
  endDate: Date;
}

export function AssessmentPortalTimer({ endDate }: props) {
  const {
    timeDifference: { days, hours, minutes, seconds },
  } = useTimer(endDate);

  return (
    <div className={styles['assessment-portal-timer']}>
      {padDigit(days.toString())
        .split('')
        .map((character: string) => (
          <Digit>{character}</Digit>
        ))}
      :
      {padDigit(hours.toString())
        .split('')
        .map((character: string) => (
          <Digit>{character}</Digit>
        ))}
      :
      {padDigit(minutes.toString())
        .split('')
        .map((character: string) => (
          <Digit>{character}</Digit>
        ))}
      :
      {padDigit(seconds.toString())
        .split('')
        .map((character: string) => (
          <Digit>{character}</Digit>
        ))}
    </div>
  );
}

function Digit({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
