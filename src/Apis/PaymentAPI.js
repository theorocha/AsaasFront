import axios from "axios";

export const generatePixQRCode = (id) => {
  return axios
    .get(`http://localhost:8081/api/generatePixQRCode/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
