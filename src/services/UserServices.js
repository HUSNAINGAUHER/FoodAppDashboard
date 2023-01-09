import requests from "./httpService";

const UserServices = {
  getAllUsers(body) {
    return requests.get(`/user`, body);
  },
  getUserById(id) {
    return requests.get(`/user/${id}`);
  },

  addUser(data) {
    return requests.post(`/user/register/token`, { token: data.token });
  },

  deleteUser(id) {
    return requests.delete(`/user/${id}`);
  },

  updateCustomer(id, data) {
    return requests.put(`/user/${id}`, { ...data });
  },

  updateCustomerStatus(id, data) {
    return requests.patch(`/user/${id}`, { ...data });
  },
};

export default UserServices;
