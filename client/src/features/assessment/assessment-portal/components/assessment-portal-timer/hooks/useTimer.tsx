import { evaluateTimeDifference } from '@projecthermes/client/features/assessment/assessment-portal/components/assessment-portal-timer/logic';
import moment from 'moment';
import { useState, useRef, useEffect } from 'react';

export function useTimer(endTime: Date) {
  const timerReset = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    value: 0,
  };
  const [timeDifference, setTimeDifference] = useState(() => {
    if (moment(endTime).isBefore(new Date())) return timerReset;
    return evaluateTimeDifference(endTime);
  });
  const { value } = timeDifference;
  const interval = useRef<NodeJS.Timer>(null);
  useEffect(() => {
    console.log(!interval.current && value > 0);
    console.log(interval.current, value);
    interval.current = setInterval(() => {
      setTimeDifference(evaluateTimeDifference(endTime));
    }, 1000);
    if (interval.current && value <= 0) {
      setTimeDifference(timerReset);
      clearInterval(interval.current);
    }

    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
    };
  }, [endTime]);

  return { timeDifference };
}
