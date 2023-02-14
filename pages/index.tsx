import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { formatClockTimer } from "../utils/utils";

const buttons = ["pomodoro", "short break", "long break"];

const Home: NextPage = () => {
  const [progress, setProgress] = useState<number>(100);
  const [currentTimer, setCurrentTimer] = useState<string>("00:00");

  const strokeWidth = 4;
  const size = 100;
  const radius = size / 2 - strokeWidth;
  const arcLength = 2 * Math.PI * radius;
  const arcOffset = arcLength * ((100 - progress) / 100);

  const currentDate = new Date();
  const countDownDate = new Date().setMinutes(currentDate.getMinutes() + 1);
  const startTimeLeft = countDownDate - new Date().getTime();

  useEffect(() => {
    const timeCounter = setInterval(() => {
      const timeleft = countDownDate - new Date().getTime();

      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      // setMinutes(minutes);
      // setSeconds(seconds);
      console.log(minutes, seconds);

      setCurrentTimer(formatClockTimer(minutes, seconds));
      setProgress((timeleft * 100) / startTimeLeft);

      if (minutes === 0 && seconds === 0) {
        clearInterval(timeCounter);
      }
    }, 1000);
  }, []);

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
      <div className="relative w-full flex justify-center my-20 -rotate-90">
        <svg className="w-80 h-80 z-50" viewBox={`0 0 ${size} ${size}`}>
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

        <div className="absolute text-6xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 z-50 rotate-90">
          {currentTimer}
        </div>
        <div className="absolute text-6xl font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 border-gray-900 w-80 h-80 border-8 rounded-full z-10"></div>
        <div className="absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800/40 via-gray-900/40 to-gray-900 w-96 h-96 rounded-full z-0"></div>
      </div>
      {/* <div
          className="relative h-96 w-96 bg-gray-800 rounded-full border-gray-800/90 z-10 w-10"
          style={{ borderWidth: "20px" }}
        >
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full z-50 border-rose-400/90"
            style={{ borderWidth: "10px" }}
          ></div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
