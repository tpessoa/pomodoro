export const formatClockTimer = (minutes: number, seconds: number) => {
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesStr}:${secondsStr}`;
};
