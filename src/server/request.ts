import axios from "axios";

const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/",
  timeout: 10000,
});

export default request;
