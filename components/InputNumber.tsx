import { FormikProps, useField } from "formik";
import React from "react";
import { FormTimers } from "../pages";

type InputNumberProps = {
  label: string;
  name: string;
};

const InputNumber = ({ label, ...props }: InputNumberProps) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="flex-col w-full space-y-2 items-center justify-center">
      <div className="text-gray-400 font-bold text-sm">{label}</div>
      <input
        {...field}
        {...props}
        type="number"
        className="w-40 p-4 focus:outline-none rounded-2xl opacity-100 bg-gray-200"
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputNumber;
