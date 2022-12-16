import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import { FiZoomIn, FiTrash2, FiEdit } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";
import MainModal from "../modal/MainModal";
import { SidebarContext } from "../../context/SidebarContext";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainDrawer from "../drawer/MainDrawer";
import CategoryDrawer from "../drawer/DeparmentDrawer";

const CustomerTable = ({ customers, customerId, setCustomerId }) => {
  const { toggleModal, toggleDrawer } = useContext(SidebarContext);
  const [title, setTitle] = useState("Department");

  const { handleUpdate, serviceId, setServiceId } = useToggleDrawer();

  const handleModalOpen = (id, title) => {
    setCustomerId(id);
    toggleModal();
    setTitle(title);
  };
  return (
    <>
      <MainModal id={customerId} title={title} />

      <MainDrawer>
        <CategoryDrawer id={customerId} />
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
              <span className="text-sm">{user.name}</span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <div
                    onClick={() => {
                      setCustomerId(user._id);
                      toggleDrawer();
                    }}
                  >
                    <Tooltip
                      id="view"
                      Icon={FiEdit}
                      title="Edit Department"
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
