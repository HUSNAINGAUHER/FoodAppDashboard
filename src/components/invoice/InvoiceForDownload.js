import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

import logoLight from "../../assets/img/logo/logo-dark.png";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});
Font.register({
  family: "DejaVu Sans",
  fonts: [
    {
      src: "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf",
    },
    {
      src: "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 60,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    color: "#4b5563",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "150px",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "#d1d5db",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },

  invoiceFirst: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: 0.5,
  },
  invoiceSecond: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  invoiceThird: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 74,
    height: 16,
    bottom: 5,
  },
  title: {
    color: "#111827",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 13,
  },
  info: {
    fontSize: 10,
    color: "#374151",
  },
  amount: {
    fontSize: 10,
    color: "#ef4444",
  },
  status: {
    color: "#10b981",
  },
  quantity: {
    color: "#1f2937",
  },
  header: {
    color: "#111827",
    fontSize: 11,
    fontFamily: "Open Sans",
    fontWeight: "bold",
  },
});

const InvoiceForDownload = ({ data }) => {
  return (
    <>
      <Document>
        {Object.keys(data).map((key) => {
          const res = data[key];
          console.log(res);
          const status = res.length > 0 ? res[0].status : "";
          const createdAt = res.length > 0 ? res[0].createdAt : "";

          return res.length ? (
            <Page size="A4" style={styles.page}>
              <View style={styles.invoiceFirst}>
                <View>
                  <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
                    #{res[0].invoice}
                  </Text>
                  <Text style={styles.info}>Shipping Option</Text>
                  <Text style={styles.info}>{res[0].shippingOption}</Text>
                </View>

                <View>
                  <Text className="text-2xl font-bold cursor-pointer ml-4">
                    Heavens
                    <Text className="" style={{ color: "#07A32A" }}>
                      Table
                    </Text>
                    .
                  </Text>
                  <Text style={styles.info}>Deparment</Text>
                  <Text style={styles.info}> {key}</Text>
                </View>
              </View>

              <View style={styles.invoiceSecond}>
                <View>
                  <Text style={styles.title}>DATE</Text>
                  <Text style={styles.info}>
                    {createdAt !== undefined && (
                      <Text>{dayjs(createdAt).format("MMMM D, YYYY")}</Text>
                    )}
                  </Text>
                </View>

                <View>
                  <Text style={styles.title}>Customer</Text>
                  <Text style={styles.info}>{res[0].name}</Text>
                  <Text style={styles.info}>
                    {" "}
                    {res[0].address.substring(0, 25)}
                  </Text>
                </View>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      <Text style={styles.header}>Sr.</Text>
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      <Text style={styles.header}>Product Name</Text>
                    </Text>
                  </View>
                </View>
                {res?.map((item, i) => (
                  <View key={i} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{i + 1} </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.title} </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Page>
          ) : (
            <></>
          );
        })}
      </Document>
    </>
  );
};

export default InvoiceForDownload;
