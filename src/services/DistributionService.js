import requests from "./httpService";

const DistributionService = {
  getAllDistribution() {
    return requests.get(`/distribution/all`);
  },
  getCurrentDistribution() {
    return requests.get(`/distribution/currentDistribution`);
  },

  getNextDistribution() {
    return requests.get(`/distribution/nextDistribution`);
  },

  addDistribution(data) {
    return requests.post(`/distribution/add`, { ...data });
  },

  updateDistribution(id, data) {
    return requests.put(`/distribution/updateDistribution`, {
      ...data,
      id,
    });
  },

  getProductById(id) {
    return requests.get(`/distribution/productById/${id}`);
  },

  deleteProductById(id) {
    return requests.delete(`/distribution/${id}`);
  },
};

export default DistributionService;
