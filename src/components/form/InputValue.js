import React from "react";
import { Input } from "@windmill/react-ui";

const InputValue = ({
  register,
  required,
  maxValue,
  minValue,
  defaultValue,
  name,
  label,
  type,
  placeholder,
}) => {
  const value = {
    valueAsNumber: true,
    required: required ? false : `${label} is required!`,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: `Minimum value ${minValue}!`,
    },
  };
  return (
    <>
      <Input
        {...register(`${name}`, value)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      />
    </>
  );
};

export const Checkbox = ({
  register,
  required,
  maxValue,
  minValue,
  defaultValue,
  name,
  label,
  type,
  placeholder,
}) => {
  const value = {
    valueAsNumber: true,
    required: required ? false : `${label} is required!`,
    max: {
      value: maxValue,
      message: `Maximum value ${maxValue}!`,
    },
    min: {
      value: minValue,
      message: `Minimum value ${minValue}!`,
    },
  };
  return (
    <div className="flex items-center">
      <Input
        {...register(`${name}`, value)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        name={name}
        value={label}
        // className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      />
      <div className="text-sm ml-2">{label}</div>
    </div>
  );
};

export default InputValue;
