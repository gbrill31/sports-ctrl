// import fetchIntercept from "fetch-intercept";
import axios from "axios";
import { toast } from "react-toastify";

let unregister;

export default {
  initInterceptors(history) {
    unregister = axios.interceptors.response.use(
      (response) => {
        const { redirectTo, notification } = response.headers;
        if (redirectTo) history.push(redirectTo);
        if (notification) {
          const notificationData = JSON.parse(notification);
          toast[notificationData.type](
            notificationData.message,
            notificationData.options
          );
        }
        return response;
      },
      (err) => Promise.reject(err)
    );
  },
  clearInterceptors() {
    axios.interceptors.response.eject(unregister);
  },
};
