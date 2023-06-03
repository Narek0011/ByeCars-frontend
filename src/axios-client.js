import axios from "axios";
import {toast} from "react-toastify";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`
});

axiosClient.interceptors.response.use((response) => response, (error) => {
  if (error) {
    console.log(error);
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  return Promise.reject(error)
});

export default axiosClient;