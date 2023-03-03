import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

import OrderServices from "../../services/OrderServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import { SidebarContext } from "../../context/SidebarContext";
import UserServices from "../../services/UserServices";

const SelectStatus1 = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    OrderServices.updateOrder(id, { status: status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <>
      <Select
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        defaultValue={order?.status}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
      >
        <option value="status" defaultValue hidden>
          {order?.status}
        </option>
        <option defaultValue={order?.status === "Delivered"} value="Delivered">
          Delivered
        </option>
        <option defaultValue={order?.status === "Pending"} value="Pending">
          Pending
        </option>
        <option
          defaultValue={order?.status === "Processing"}
          value="Processing"
        >
          Processing
        </option>
        <option defaultValue={order?.status === "Cancel"} value="Cancel">
          Cancel
        </option>
      </Select>
    </>
  );
};

export const SelectStatus = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = (id, status) => {
    UserServices.updateCustomerStatus(id, {
      verified: status === "Approved" ? true : false,
    })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <>
      <Select
        onChange={(e) => handleChangeStatus(id, e.target.value)}
        className="border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none"
        value={order?.verified ? "Approved" : "Pending"}
      >
        <option value="status" defaultValue hidden>
          {order?.verified === undefined || order?.verified
            ? "Approved"
            : "Pending"}
        </option>
        <option defaultValue={order?.status === "Approved"} value="Approved">
          Approved
        </option>
        <option defaultValue={order?.status === "Pending"} value="Pending">
          Pending
        </option>
      </Select>
    </>
  );
};

export default SelectStatus1;
