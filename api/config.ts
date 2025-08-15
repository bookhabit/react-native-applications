import axios from "axios";

const BASE_SERVER_URL = "http://10.0.2.2:8000";

const AXIOS = axios.create({
  baseURL: BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export { AXIOS };
