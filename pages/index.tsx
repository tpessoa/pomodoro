import type { NextPage } from "next";
import { Fragment, useEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import { formatClockTimer } from "../utils/utils";
import { RiSettings4Fill } from "react-icons/ri";

const buttons = ["pomodoro", "short break", "long break"];

const Home: NextPage = () => {
  const [progress, setProgress] = useState<number>(100);
  const [currentTimer, setCurrentTimer] = useState<string>("00:00");
  const [counterPaused, setCounterPaused] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const strokeWidth = 4;
  const size = 100;
  const radius = size / 2 - strokeWidth;
  const arcLength = 2 * Math.PI * radius;
  const arcOffset = arcLength * ((100 - progress) / 100);

  const counterTimeInput = 20;
  const timeMetric = 1000; // 1 second
  const timer = useRef<any>(null);

  const resetCountDownTimer = () => {
    setCurrentTimer("00:00");
    setProgress(100);
    setElapsedTime(0);
    setCounterPaused(true);
  };

  const refreshCountDownTimer = (date: number, initalTimeLeft: number) => {
    const timeleft =
      Math.round((date - new Date().getTime()) / timeMetric) * timeMetric;

    setCurrentTimer(formatClockTimer(timeleft));
    setElapsedTime((previousValue) => previousValue + 1);

    if (timeleft <= 0) {
      clearInterval(timer.current);
      resetCountDownTimer();
    } else {
      setProgress((timeleft * 100) / initalTimeLeft);
    }
  };

  const startTimer = () => {
    // console.log("Timer starting...");
    setCounterPaused(false);

    if (elapsedTime >= counterTimeInput) {
      resetCountDownTimer();
      return;
    }

    const countDownDate = new Date().setSeconds(
      new Date().getSeconds() + counterTimeInput
    );
    const countDownDateWithElapsedTime = new Date().setSeconds(
      new Date().getSeconds() + counterTimeInput - elapsedTime
    );

    const initalTimeLeft = countDownDate - new Date().getTime();
    timer.current = setInterval(
      () => refreshCountDownTimer(countDownDateWithElapsedTime, initalTimeLeft),
      timeMetric
    );
  };

  const pauseTimer = () => {
    // console.log("Timer pausing...");
    // console.log("Elapsed time: ", elapsedTime);
    clearInterval(timer.current);
    setCounterPaused(true);
  };

  return (
    <div className="bg-dark-purple h-screen font-sans">
      <h1 className="text-center text-gray-200 text-3xl font-semibold py-12">
        pomodoro
      </h1>
      <div className="w-full flex justify-center">
        <Tab.Group>
          <Tab.List className="bg-gray-900/60 p-2 rounded-full">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`font-bold text-sm py-4 px-8 rounded-full focus:outline-none ${
                    selected ? "bg-rose-400/90 text-gray-800" : "text-gray-500"
                  }`}
                >
                  pomodoro
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`font-bold text-sm py-3 px-6 rounded-full focus:outline-none ${
                    selected ? "bg-rose-400/90 text-gray-800" : "text-gray-500"
                  }`}
                >
                  short break
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`font-bold text-sm py-3 px-6 rounded-full focus:outline-none ${
                    selected ? "bg-rose-400/90 text-gray-800" : "text-gray-500"
                  }`}
                >
                  long break
                </button>
              )}
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="relative w-full flex justify-center my-24 ">
        <svg
          className="w-80 h-80 z-50 -rotate-90"
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
        <div className="absolute text-7xl font-semibold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 z-50">
          {currentTimer}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-50 ">
          <button
            onClick={() => (counterPaused ? startTimer() : pauseTimer())}
            className="flex items-end justify-center w-full"
            style={{ height: "80%" }}
          >
            <span
              className="text-gray-200 text-ll uppercase text-center"
              style={{
                letterSpacing: "1rem",
                marginRight: "-1rem",
              }}
            >
              {counterPaused ? "Start" : "Pause"}
            </span>
          </button>
        </div>
        <div className="absolute text-6xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border-gray-900 w-80 h-80 border-8 rounded-full z-10"></div>
        <div className="absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800/40 via-gray-900/40 to-gray-900 w-96 h-96 rounded-full z-0"></div>
      </div>
      <div className="w-full flex justify-center">
        <button className="w-12 h-12">
          <RiSettings4Fill className="w-full h-full text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Home;
