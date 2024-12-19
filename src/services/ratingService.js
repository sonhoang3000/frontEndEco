import axios from "../axios";
const createNewRating = (data) => {
      return axios.post(`/api/rating`, data);
};
const getListRating = (productId) => {
      return axios.get(`/api/rating/${productId}`);
};
const getALlRating = (params) => {
      return axios.get(`/api/rating`, { params: params });
};
export { createNewRating, getListRating, getALlRating };