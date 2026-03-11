import apiClient from "./apiClient";

const API_URL = {
  USER: "/user",
  LOGIN: "/user/login",
  LOGOUT: "/user/logout",
  PRODUCT_LIST: "/product/list",
  PRODUCT: "/product",
  REFRESH_TOKEN: "/user/refresh-token",
};
const login = (payload) => apiClient.post(API_URL.LOGIN, payload);
const getUser_info = () => apiClient.get(API_URL.USER);
const refresh_token = () => apiClient.post(API_URL.REFRESH_TOKEN);
const product_list = ({ page, limit, search }) =>
  apiClient.get(API_URL.PRODUCT_LIST, {
    params: { page, limit, search },
  });
const getProduct = (productId) =>
  apiClient.get(`${API_URL.PRODUCT}/${productId}`);
const create_product = (payload) => apiClient.post(API_URL.PRODUCT, payload);
const update_product = (product, productId) =>
  apiClient.put(`${API_URL.PRODUCT}/${productId}`, product);
const delete_product = (productId) =>
  apiClient.delete(`${API_URL.PRODUCT}/${productId}`);
const logout = () => apiClient.post(API_URL.LOGOUT);

export default {
  login,
  logout,
  getUser_info,
  product_list,
  refresh_token,
  getProduct,
  create_product,
  update_product,
  delete_product,
};
