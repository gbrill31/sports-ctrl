// import fetchIntercept from "fetch-intercept";
import axios from 'axios';
import { toast } from 'react-toastify';

let unregisterRequest, unregisterResponse;

function handleResponseHeaders({ redirectto, notification }, history) {
  if (redirectto && history) {
    history.push(redirectto);
  }
  if (notification) {
    const notificationData = JSON.parse(notification);
    toast[notificationData.type](
      notificationData.message,
      notificationData.options
    );
  }
}

export default {
  initInterceptors(history) {
    unregisterRequest = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        config.headers.common['Authorization'] = token;
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    unregisterResponse = axios.interceptors.response.use(
      (response) => {
        if (response.headers) handleResponseHeaders(response.headers, history);
        return response;
      },
      (err) => {
        if (err.response.headers) handleResponseHeaders(err.response.headers);
        return Promise.reject(err);
      }
    );
  },
  clearInterceptors() {
    axios.interceptors.response.eject(unregisterResponse);
    axios.interceptors.request.eject(unregisterRequest);
  },
};
