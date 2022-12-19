import React, { useContext, useState } from "react";
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
import * as dayjs from "dayjs";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import UserServices from "../services/UserServices";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import CustomerTable from "../components/customer/DistrubutionTable";
import DistributionService from "../services/DistributionService";
import CardItem from "../components/dashboard/CardItem";
import { SidebarContext } from "../context/SidebarContext";

import MainDrawer from "../components/drawer/MainDrawer";
import ProductDrawer from "../components/drawer/DistrubutionDrawer";

import {
  FiShoppingCart,
  FiTruck,
  FiRefreshCw,
  FiCheck,
  FiPlus,
} from "react-icons/fi";

const Distribution = () => {
  const { data, loading } = useAsync(DistributionService.getAllDistribution);
  const { data: current } = useAsync(
    DistributionService.getCurrentDistribution
  );
  const { data: next } = useAsync(DistributionService.getNextDistribution);

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
      <PageTitle>Distribution</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2 mb-10">
        <CardItem
          title="Current Distribution"
          Icon={FiShoppingCart}
          size={"sm"}
          quantity={
            current
              ? `${dayjs(current[0]?.start).format("MMM D, YYYY")} -
                ${dayjs(current[0]?.end).format("MMM D, YYYY")}`
              : ""
          }
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-50"
        />
        <CardItem
          title="Next Distribution"
          Icon={FiRefreshCw}
          quantity={
            next?.length
              ? `${dayjs(next[0]?.start).format("MMM D, YYYY")} -
                ${dayjs(next[0]?.end).format("MMM D, YYYY")}`
              : ""
          }
          size="sm"
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
      </div>

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
          Add Distribution
        </Button>
      </div>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="flex justify-center">
          <div
            className={`${serviceData.length && "block"} ${
              !serviceData.length && "hidden"
            } w-full`}
          >
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>ID</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Limit</TableCell>
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
          </div>
          <div
            className={`${!serviceData.length && "block"} ${
              serviceData.length && "hidden"
            } `}
          >
            <NotFound title="Distribution" />
          </div>
        </div>
      )}
    </>
  );
};

export default Distribution;
