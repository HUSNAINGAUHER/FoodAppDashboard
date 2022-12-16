import React, { useContext } from "react";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import { ImStack, ImCreditCard } from "react-icons/im";
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import OrderServices from "../services/OrderServices";
import Loading from "../components/preloader/Loading";
import CardItem from "../components/dashboard/CardItem";
import PageTitle from "../components/Typography/PageTitle";
import OrderTable from "../components/dashboard/OrderTable";
import CardItemTwo from "../components/dashboard/CardItemTwo";
import { SidebarContext } from "../context/SidebarContext";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  dayjs.extend(isBetween);

  const [salesReport, setSalesReport] = useState([]);
  const [todayOrder, setTodayOrder] = useState(0);
  const { currentPage, handleChangePage } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    OrderServices.getDashboardOrdersData({
      page: currentPage,
      limit: 8,
    })
  );

  const { dataTable } = useFilter(data?.orders);

  useEffect(() => {
    const todayOrderTotal = data?.todayOrder?.reduce(
      (pre, acc) => pre + acc.total,
      0
    );
    setTodayOrder(todayOrderTotal);
    data?.weeklySaleReport?.reduce((res, value) => {
      let onlyDate = value.createdAt.split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});
  }, [data?.todayOrder, data?.weeklySaleReport, salesReport]);

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          quantity={data?.totalOrder}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Order Pending"
          Icon={FiRefreshCw}
          quantity={data?.totalPendingOrder?.count}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Order Processing"
          Icon={FiTruck}
          quantity={data?.totalProcessingOrder}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Order Delivered"
          Icon={FiCheck}
          quantity={data?.totalDeliveredOrder}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <PageTitle>Recent Order</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Order Time</TableCell>
                <TableCell>Delivery Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delivery/Pickup</TableCell>
                <TableCell>Status</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalOrder}
              resultsPerPage={8}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard;
