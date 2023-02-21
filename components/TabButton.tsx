import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";

type TabButtonProps = {
  label: string;
};

const TabButton = ({ label }: TabButtonProps) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={`font-bold text-sm py-4 px-8 rounded-full focus:outline-none ${
            selected ? "bg-rose-400/90 text-gray-800" : "text-gray-500"
          }`}
        >
          {label}
        </button>
      )}
    </Tab>
  );
};

export default TabButton;
