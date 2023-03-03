import requests from "./httpService";

const ProductServices = {
  getAllProducts({ page, limit, category, title, price, department }) {
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";
    const searchDepartment = department !== null ? department : "";

    return requests.get(
      `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}&department=${searchDepartment}`
    );
  },

  getStockOutProducts() {
    return requests.get("/products/stock-out");
  },

  getProductById(id) {
    return requests.post(`/products/${id}`);
  },

  addProduct(body) {
    return requests.post("/products/add", body);
  },

  addAllProducts(body) {
    return requests.post("/products/all", body);
  },

  updateProduct(id, body) {
    return requests.put(`/products/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct(id) {
    return requests.delete(`/products/${id}`);
  },
};

export default ProductServices;
