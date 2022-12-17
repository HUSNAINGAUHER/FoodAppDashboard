import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  WindmillContext,
} from "@windmill/react-ui";
import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";

import useAsync from "../hooks/useAsync";
import Status from "../components/table/Status";
import OrderServices from "../services/OrderServices";
import Invoice from "../components/invoice/Invoice";
import Loading from "../components/preloader/Loading";
import logoDark from "../assets/img/logo/logo-dark.svg";
import logoLight from "../assets/img/logo/logo-light.svg";
import PageTitle from "../components/Typography/PageTitle";
import InvoiceForDownload from "../components/invoice/InvoiceForDownload";

const OrderInvoice = () => {
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();

  const { data: d, loading } = useAsync(() => OrderServices.getOrderById(id));

  const filter = {};

  if (d) {
    d.cart?.map((m) => {
      if (m.department in filter) {
        filter[m.department].push(m);
      } else {
        filter[m.department] = [];
        filter[m.department].push({ ...m, s: d.status, ...d });
      }
    });
  }

  console.log(filter);

  return (
    <div>
      <PageTitle>Order</PageTitle>
      <Document ref={printRef}>
        {Object.keys(filter).map((fil) => {
          const data = filter[fil][0];
          return (
            <Page>
              <div className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
                {!loading && (
                  <div className="">
                    <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
                      <h1 className="font-bold font-serif text-xl uppercase">
                        Order
                        <p className="text-xs mt-1 text-gray-500">
                          Status:{" "}
                          <span className="pl-2 font-medium text-xs capitalize">
                            {" "}
                            <Status status={data.status} />
                          </span>
                        </p>
                      </h1>
                      <div className="lg:text-right text-left">
                        <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                          <a
                            className=" text-gray-900 dark:text-gray-200"
                            href="/dashboard"
                          >
                            <div className="text-2xl font-bold cursor-pointer ml-4">
                              Heavens
                              <span className="" style={{ color: "#07A32A" }}>
                                Table
                              </span>
                              .
                            </div>
                          </a>
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                          Department: {fil}
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                      <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                        <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                          Date
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          {data.createdAt !== undefined && (
                            <span>
                              {dayjs(data?.createdAt).format("MMMM D, YYYY")}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                        <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                          Order No
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          #10012
                        </span>
                      </div>
                      <div className="flex flex-col lg:text-right text-left">
                        <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                          Order To.
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 block">
                          {data.name}
                          <br />
                          {data.address?.substring(0, 25)}
                          <br />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  {loading ? (
                    <Loading loading={loading} />
                  ) : (
                    <TableContainer className="my-8">
                      <Table>
                        <TableHeader>
                          <tr>
                            <TableCell> Sr.</TableCell>
                            <TableCell>Product Name</TableCell>

                            <TableCell className="text-center">
                              Delivery/Picklup
                            </TableCell>
                          </tr>
                        </TableHeader>
                        <Invoice
                          data={filter[fil]}
                          shippingOption={d.shippingOption}
                        />
                      </Table>
                    </TableContainer>
                  )}
                </div>
              </div>
            </Page>
          );
        })}
      </Document>
      {!loading && (
        <div className="mb-4 mt-3 flex justify-between">
          <PDFDownloadLink
            document={<InvoiceForDownload data={filter} />}
            fileName="Order"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading..."
              ) : (
                <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto cursor-pointer">
                  Download Order{" "}
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default OrderInvoice;
