import React, { useState } from "react";
import { Select } from "@windmill/react-ui";

const SelectRole = ({ setRole, register, name, label }) => {
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Staff role
        </option>
        <option value="Admin">Admin</option>
        <option value="Packing">Packing Deparment</option>
      </Select>
    </>
  );
};

export const SelectMathod = ({ value, setRole, register, name, label }) => {
  const [val, setVal] = useState(value);
  console.log(value);
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        defaultValue={val}
      >
        <option value="Pickup">Self Pickup</option>
        <option value="Delivery">Deleiver to my address</option>
      </Select>
    </>
  );
};
export default SelectRole;
