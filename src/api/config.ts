import axios from "axios";

console.log(axios.extendVersion);

export const baseUrl = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  loading: true
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err, "网络错误");
    return Promise.reject(err);
  }
);

export { axiosInstance };
