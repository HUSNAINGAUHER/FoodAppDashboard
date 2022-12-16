import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import Status from "../table/Status";
import { FiDelete, FiEdit, FiTrash, FiZoomIn } from "react-icons/fi";
import Tooltip from "../tooltip/Tooltip";
import SelectStatus from "../form/SelectStatus";
import MainDrawer from "../drawer/MainDrawer";
import DistrubutionDrawer from "../drawer/OrderDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import { SidebarContext } from "../../context/SidebarContext";

const OrderTable = ({
  orders,
  customerId,
  toggleModal,
  setCustomerId,
  toggleDrawer,
}) => {
  return (
    <>
      <TableBody>
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">{i + 1}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order.address.substring(0, 25)}</span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">{order.contact}</span>{" "}
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm">{order.shippingOption}</span>{" "}
            </TableCell>

            <TableCell className="text-center text-xs">
              <Status status={order.status} />
            </TableCell>
            <TableCell className="text-center">
              <SelectStatus id={order._id} order={order} />
            </TableCell>
            <TableCell className="text-right flex px-10">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                <Link to={`/order/${order._id}`}>
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title="View Invoice"
                    bgColor="#34D399"
                  />
                </Link>
              </div>
              <div
                className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                onClick={() => {
                  setCustomerId(order._id);
                  toggleDrawer();
                }}
              >
                <Tooltip
                  id="edit"
                  Icon={FiEdit}
                  title="Edit Order"
                  bgColor="#34D399"
                />
              </div>
              <div
                className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                onClick={() => {
                  console.log("ddd");
                  setCustomerId(order._id);
                  toggleModal();
                }}
              >
                <Tooltip
                  id="delete"
                  Icon={FiTrash}
                  title="Delete Order"
                  bgColor="#34D399"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
