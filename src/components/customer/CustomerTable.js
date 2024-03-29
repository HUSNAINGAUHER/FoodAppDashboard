import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiZoomIn, FiTrash2, FiEdit } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import { SidebarContext } from "../../context/SidebarContext";
import MainDrawer from "../drawer/MainDrawer";
import CategoryDrawer from "../drawer/CategoryDrawer";
import ProductDrawer from "../drawer/CustomerDrawer";
import Status from "../table/Status";
import { SelectStatus } from "../form/SelectStatus";

const CustomerTable = ({ customers, customerId, setCustomerId }) => {
  const { toggleModal, toggleDrawer } = useContext(SidebarContext);
  const [title, setTitle] = useState("");

  const handleModalOpen = (id, title) => {
    setCustomerId(id);
    toggleModal();
    setTitle(title);
  };

  console.log(customers);

  return (
    <>
      <MainModal id={customerId} title={title} />
      <MainDrawer>
        <ProductDrawer id={customerId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                {user._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.phone}</span>
            </TableCell>

            <TableCell className="text-center">
              <Status
                status={
                  user.verified === undefined || user.verified
                    ? "Verified"
                    : "Pending"
                }
              />
            </TableCell>

            <TableCell className="text-right">
              <SelectStatus id={user._id} order={user} />
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <Link to={`/customer-order/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title="View Order"
                      bgColor="#34D399"
                    />
                  </Link>
                </div>
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <div
                    onClick={() => {
                      setCustomerId(user._id);
                      toggleDrawer();
                    }}
                  >
                    <Tooltip
                      id="edit"
                      Icon={FiEdit}
                      title="Edit Customer"
                      bgColor="#34D399"
                    />
                  </div>
                </div>
                <div
                  onClick={() => handleModalOpen(user._id, user.name)}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                >
                  <Tooltip
                    id="delete"
                    Icon={FiTrash2}
                    title="Delete"
                    bgColor="#F87171"
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
