// import fetchIntercept from "fetch-intercept";
import axios from "axios";
import { toast } from "react-toastify";

let unregisterResponse;

function handleResponseHeaders({ redirectto, notification }, history) {
  if (redirectto && history) history.push(redirectto);
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
    unregisterResponse = axios.interceptors.response.use(
      (response) => {
        handleResponseHeaders(response.headers, history);
        return response;
      },
      (err) => {
        handleResponseHeaders(err.response.headers);
        return Promise.reject(err);
      }
    );
  },
  clearInterceptors() {
    axios.interceptors.response.eject(unregisterResponse);
  },
};
