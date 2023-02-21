import React, { useEffect, useRef, useState } from "react";
import { formatClockTimer } from "../utils/utils";

type CountDownTimerProps = {
  initialClockTimer: number;
};

const CountDownTimer = ({ initialClockTimer }: CountDownTimerProps) => {
  const [progress, setProgress] = useState<number>(100);
  const [currentTimer, setCurrentTimer] = useState<string>();
  const [counterPaused, setCounterPaused] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    resetCountDownTimer();
    setCurrentTimer(formatClockTimer(initialClockTimer));
    console.log(initialClockTimer, formatClockTimer(initialClockTimer));
  }, [initialClockTimer]);

  const strokeWidth = 4;
  const size = 100;
  const radius = size / 2 - strokeWidth;
  const arcLength = 2 * Math.PI * radius;
  const arcOffset = arcLength * ((100 - progress) / 100);

  const timeMetric = 1000; // 1 second
  const timer = useRef<any>(null);

  const getElapsedTime = () => {
    return elapsedTime;
  };

  const resetCountDownTimer = () => {
    clearInterval(timer.current);
    setCounterPaused(true);
    setCurrentTimer("00:00");
    setProgress(100);
    setElapsedTime(0);
  };

  const refreshCountDownTimer = (date: number, initalTotalTime: number) => {
    const timeleft =
      Math.round((date - new Date().getTime()) / timeMetric) * timeMetric;
    setCurrentTimer(formatClockTimer(timeleft));
    setElapsedTime((previousValue) => previousValue + 1);

    // console.log(new Date(date).toLocaleTimeString());
    // console.log(formatClockTimer(timeleft));

    // console.log(formatClockTimer(timeleft));

    if (timeleft <= 0) {
      resetCountDownTimer();
    } else {
      setProgress((timeleft * 100) / initalTotalTime);
    }
  };

  const startTimer = () => {
    // console.log("Timer starting...");

    if (isNaN(initialClockTimer)) {
      return;
    }

    setCounterPaused(false);

    if (getElapsedTime() >= initialClockTimer) {
      resetCountDownTimer();
      return;
    }

    const countDownDate = new Date().setSeconds(
      new Date().getSeconds() + initialClockTimer / 1000
    );
    const initalTotalTime = countDownDate - new Date().getTime();

    const countDownDateWithElapsedTime = new Date().setSeconds(
      new Date().getSeconds() + initialClockTimer / 1000 - getElapsedTime()
    );

    timer.current = setInterval(
      () =>
        refreshCountDownTimer(countDownDateWithElapsedTime, initalTotalTime),
      timeMetric
    );

    console.log(new Date(countDownDateWithElapsedTime).toLocaleTimeString());
  };

  const pauseTimer = () => {
    // console.log("Timer pausing...");
    // console.log("Elapsed time: ", elapsedTime);
    clearInterval(timer.current);
    setCounterPaused(true);
  };

  return (
    <div className="relative w-full flex justify-center my-24 ">
      <svg
        className="w-64 h-64 md:w-80 md:h-80 z-20 -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-rose-400/90"
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={arcLength}
          strokeDashoffset={arcOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
        />
      </svg>
      <div className="absolute text-6xl md:text-7xl font-semibold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 z-20 tracking-tight">
        {currentTimer}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 z-20 ">
        <div
          className="flex items-end justify-center w-full"
          style={{ height: "80%" }}
        >
          <button
            onClick={() => (counterPaused ? startTimer() : pauseTimer())}
            className="text-gray-200 text-xs md:text-lg uppercase text-center"
            style={{
              letterSpacing: "1rem",
              marginRight: "-1rem",
            }}
          >
            {counterPaused ? "Start" : "Pause"}
          </button>
        </div>
      </div>
      <div className="absolute text-6xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border-gray-900 w-64 h-64 md:w-80 md:h-80 border-8 rounded-full z-10"></div>
      <div className="absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800/40 via-gray-900/40 to-gray-900 w-72 h-72 md:w-96 md:h-96 rounded-full z-0"></div>
    </div>
  );
};

export default CountDownTimer;
