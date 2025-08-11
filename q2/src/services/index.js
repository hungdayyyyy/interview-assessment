import axios from "axios";

/**
 * Parse error response
 */
function parseError(messages) {
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages });
    }
    return Promise.reject({ messages: [messages] });
  }
  return Promise.reject({ messages: ["Server error occurred"] });
}

/**
 * Parse response body
 */
export function parseBody(response) {
  const resData = response.data;

  // Handle server errors >= 500
  if (+response?.status >= 500) {
    console.error("Server error:", response.error);
    return resData;
  }

  // Handle other non-200 status codes
  if (+response?.status < 500 && +response?.status !== 200) {
    return resData;
  }

  // Handle successful responses
  if (response?.status === 200) {
    return resData;
  }

  return parseError(resData?.messages);
}

/**
 * Axios instance with basic configuration
 */
const instance = axios.create({
  timeout: 60000,
  withCredentials: false,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add any default headers or auth tokens here
    return config;
  },
  (error) => Promise.reject(error.message)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return parseBody(response);
  },
  (error) => {
    // Handle connection errors
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else if (+error?.response?.status >= 500) {
      console.error("Server error:", error.response?.data?.error);
    } else if (error.code === "ERR_NETWORK") {
      console.error("Network error - please check your connection");
    } else if (error.response) {
      console.error("API error:", error.response.data);
      return parseError(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default instance;

/**
 * HTTP GET method
 */
export const httpGet = (path = "", optionalHeader = {}) =>
  instance({
    method: "GET",
    url: path,
    headers: { ...optionalHeader },
  });

/**
 * HTTP PUT method
 */
export const httpPut = (path = "", data = {}, optionalHeader = {}) =>
  instance({
    method: "PUT",
    url: path,
    data,
    headers: { ...optionalHeader },
  });
