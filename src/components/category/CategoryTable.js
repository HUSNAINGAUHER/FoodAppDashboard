import React from "react";
import { TableBody, TableRow, TableCell, Avatar } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ShowHideButton from "../table/ShowHideButton";
import CategoryDrawer from "../drawer/CategoryDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const CategoryTable = ({ categories }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent._id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent._id.substring(20, 24)}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={parent.icon}
                alt={parent.parent}
              />
            </TableCell>

            <TableCell className="text-sm">{parent.parent}</TableCell>
            <TableCell className="text-sm">{parent.limit}</TableCell>
            <TableCell className="text-sm">
              {parent.baby ? "yes" : "no"}
            </TableCell>

            <TableCell>
              <ShowHideButton id={parent._id} status={parent.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={parent._id}
                title={parent.parent}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
