import requests from "./httpService";

const DistributionService = {
  getAllDistribution() {
    return requests.get(`/department/all`);
  },
  getCurrentDistribution() {
    return requests.get(`/department/currentDistribution`);
  },

  getNextDistribution() {
    return requests.get(`/department/nextDistribution`);
  },

  addDistribution(data) {
    return requests.post(`/department/add`, { ...data });
  },

  updateDistribution(id, data) {
    return requests.put(`/department/updateDistribution`, {
      ...data,
      id,
    });
  },

  getProductById(id) {
    return requests.get(`/department/productById/${id}`);
  },

  deleteProductById(id) {
    return requests.delete(`/department/${id}`);
  },
};

export default DistributionService;
