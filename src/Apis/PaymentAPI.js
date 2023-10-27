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

export const payPixQRCode = (postData) => {
  return axios
    .post("http://localhost:8081/api/pix-payment", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
