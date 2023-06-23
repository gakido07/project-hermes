import moment from 'moment';

export function evaluateTimeDifference(date: Date) {
  const timestampMoment = moment(date);
  const currentMoment = moment(new Date());
  const difference = timestampMoment.diff(currentMoment);
  return splitTimeDifferenceIntoUnits(difference);
}

function splitTimeDifferenceIntoUnits(difference: number) {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds,
    value: difference,
  };
}

export function padDigit(digit: string) {
  return digit.padStart(2, '0');
}

export function convertTimestampToCurrentTimezone(timestamp: string): Date {
  const timestampMoment = moment.utc(timestamp);
  return moment(timestampMoment).local().toDate();
}
