import axios from "axios";
import queryString from "query-string";
import envConfigs from "../../configs/env.configs";

const baseURL = envConfigs.apiBaseUrl;

const getAccessToken = () => {
  const token = localStorage.getItem("actkn");

  if (!token) return null;

  const normalizedToken = token.trim();

  if (!normalizedToken || ["null", "undefined"].includes(normalizedToken.toLowerCase())) {
    localStorage.removeItem("actkn");
    return null;
  }

  return normalizedToken;
};

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(async config => {
  const token = getAccessToken();

  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };
});

privateClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default privateClient
