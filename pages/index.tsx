import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { RiSettings4Fill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import Modal from "react-modal";
import InputNumber from "../components/InputNumber";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import CountDownTimer from "../components/CountDownTimer";

Modal.setAppElement("#pomodoro");

export type FormTimers = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
};

const Home: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [timers, setTimers] = useState<FormTimers | null>(null);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  useEffect(() => {
    // set default timers if they doesn't exist
    const timers = JSON.parse(localStorage.getItem("timers")!);
    if (!timers) {
      localStorage.setItem(
        "timers",
        JSON.stringify({ pomodoro: 10, shortBreak: 2, longBreak: 15 })
      );
    }

    setTimers(JSON.parse(localStorage.getItem("timers")!));
  }, []);

  const updateTimersOnLocalStorage = (values: FormTimers) => {
    setTimers(values);
    localStorage.setItem("timers", JSON.stringify(values));
  };

  return (
    <div className="bg-dark-purple h-screen font-sans" id="pomodoro">
      <h1 className="text-center text-gray-200 text-3xl font-semibold py-12">
        pomodoro
      </h1>
      <div className="w-full flex justify-center items-center">
        <Tab.Group>
          <Tab.List className="bg-gray-900/60 p-2 rounded-full flex">
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
      <CountDownTimer />
      <div className="w-full flex justify-center">
        <button className="w-12 h-12" onClick={() => setIsOpen(true)}>
          <RiSettings4Fill className="w-full h-full text-gray-500" />
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className="w-full md:w-auto bg-stone-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
        style={{
          overlay: { zIndex: 30, backgroundColor: "transparent" },
        }}
      >
        <div className="md:w-[600px] relative min-h-[400px]">
          <Formik
            initialValues={{
              pomodoro: timers?.pomodoro!,
              longBreak: timers?.longBreak!,
              shortBreak: timers?.shortBreak!,
            }}
            onSubmit={(
              values: FormTimers,
              { setSubmitting }: FormikHelpers<FormTimers>
            ) => {
              updateTimersOnLocalStorage(values);
              setSubmitting(true);
              setIsOpen(false);
            }}
          >
            {(props: FormikProps<FormTimers>) => (
              <Form>
                <div className="flex justify-between items-center p-8 border-b border-gray-500/50">
                  <div className="text-3xl font-bold text-gray-700 tracking-tight">
                    Settings
                  </div>
                  <button className="w-6 h-6">
                    <MdOutlineClose className="w-full h-full text-gray-500/50" />
                  </button>
                </div>
                <div className="flex-col items-center px-8 pt-4 pb-8">
                  <div className="uppercase font-bold tracking-widest text-md">
                    Time (minutes)
                  </div>
                  <div className="flex-row md:flex my-4 justify-between">
                    <InputNumber name="pomodoro" label="pomodoro" />
                    <InputNumber name="shortBreak" label="short break" />
                    <InputNumber name="longBreak" label="long break" />
                  </div>
                </div>
                <div className="absolute transform bottom-0 -translate-x-1/2 left-1/2 translate-y-1/2">
                  <button
                    type="submit"
                    className="bg-rose-400 px-10 py-3 rounded-full text-white font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
