import React from "react";
import { Select } from "@windmill/react-ui";
import ParentCategory from "../category/ParentCategory";
import DistributionService from "../../services/DepartmentService";

import useAsync from "../../hooks/useAsync";
const SelectCategory = ({ setCategory }) => {
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="All" defaultValue hidden>
          Category
        </option>
        <ParentCategory />
      </Select>
    </>
  );
};

export const SelectDepartment = ({ setDepartment }) => {
  const { data } = useAsync(DistributionService.getAllDistribution); //   console.log(value);
  return (
    <>
      <Select
        onChange={(e) => setDepartment(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="All" defaultValue hidden>
          Department
        </option>
        {data.map((parent) => (
          <option key={parent._id} value={parent.name}>
            {parent.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCategory;
