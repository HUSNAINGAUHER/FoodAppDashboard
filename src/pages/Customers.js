import React, { useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
  Button,
} from "@windmill/react-ui";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import UserServices from "../services/UserServices";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import CustomerTable from "../components/customer/CustomerTable";
import { SidebarContext } from "../context/SidebarContext";
import { FiPlus } from "react-icons/fi";

const Customers = () => {
  const { data, loading } = useAsync(UserServices.getAllUsers);

  const {
    userRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data);

  const [id, setID] = useState(undefined);
  const {
    toggleDrawer,
    currentPage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  return (
    <>
      <PageTitle>Customers</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by name/email/phone"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="w-full md:w-56 lg:w-56 xl:w-56 my-5 flex-end float-right">
        <Button
          onClick={() => {
            toggleDrawer();
            setID(undefined);
          }}
          className="w-full rounded-md h-12"
        >
          <span className="mr-3">
            <FiPlus />
          </span>
          Add Customer
        </Button>
      </div>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <TableContainer
            className={`mb-8 ${serviceData.length === 0 && "hidden"}`}
          >
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>ID</TableCell>
                  <TableCell>Joining Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Approved</TableCell>

                  <TableCell className="text-right">Actions</TableCell>
                </tr>
              </TableHeader>
              <CustomerTable
                customers={dataTable}
                customerId={id}
                setCustomerId={setID}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
          {serviceData.length === 0 && <NotFound title="Customer" />}
        </>
      )}
    </>
  );
};

export default Customers;
