export const formatClockTimer = (timeleft: number) => {
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (isNaN(minutes) || isNaN(minutes)) {
    return "00:00";
  }

  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutesStr}:${secondsStr}`;
};

export const getTimeleft = (date: number, timeMetric: number) => {
  return Math.round((date - new Date().getTime()) / timeMetric) * timeMetric;
};
