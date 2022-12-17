import React, { useContext, useState } from "react";
import { CSVDownloader } from "react-papaparse";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { IoCloudDownloadOutline } from "react-icons/io5";

import orderData from "../utils/orders";
import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import OrderServices from "../services/OrderServices";
import Loading from "../components/preloader/Loading";
import OrderTable from "../components/order/OrderTable";
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import MainDrawer from "../components/drawer/MainDrawer";
import DistrubutionDrawer from "../components/drawer/OrderDrawer";
import MainModal from "../components/modal/MainModal";

const Orders = () => {
  const {
    time,
    setTime,
    currentPage,
    searchText,
    searchRef,
    status,
    setStatus,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
    toggleDrawer,
    toggleModal,
  } = useContext(SidebarContext);

  console.log(toggleModal);
  const { data, loading } = useAsync(() =>
    OrderServices.getAllOrders({
      contact: searchText,
      status,
      page: currentPage,
      limit: resultsPerPage,
      day: time,
    })
  );
  const [customerId, setCustomerId] = useState(undefined);
  const { dataTable, serviceData } = useFilter(data.orders);

  return (
    <>
      <MainModal id={customerId} title={"Order"} />
      <MainDrawer>
        <DistrubutionDrawer id={customerId} />
      </MainDrawer>

      <PageTitle>Orders</PageTitle>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:grid-cols-4 xl:grid-cols-4"
          >
            <div>
              <Input
                ref={searchRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder="Search by Order No"
              />
            </div>
            <div>
              <Select
                onChange={(e) => setStatus(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Status" defaultValue hidden>
                  Status
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Cancel">Cancel</option>
              </Select>
            </div>
            <div>
              <Select
                onChange={(e) => setTime(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="Order limits" defaultValue hidden>
                  Order limits
                </option>
                <option value="5">Last 5 days orders</option>
                <option value="7">Last 7 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </Select>
            </div>
            <div>
              <CSVDownloader data={data.orders} filename={"orders"}>
                <button
                  type="button"
                  className="flex items-center justify-center text-sm leading-5 h-12 text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
                >
                  Download all Orders
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              </CSVDownloader>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Order NO</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Shipping Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delivery/Pickup</TableCell>
                <TableCell className="text-center">Status</TableCell>
                <TableCell className="text-center">Action</TableCell>
                <TableCell className="text-center"></TableCell>
              </tr>
            </TableHeader>
            <OrderTable
              orders={dataTable}
              customerId={customerId}
              setCustomerId={setCustomerId}
              toggleDrawer={toggleDrawer}
              toggleModal={toggleModal}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={10}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Order" />
      )}
    </>
  );
};

export default Orders;
