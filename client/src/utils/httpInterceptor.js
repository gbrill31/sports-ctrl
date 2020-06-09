import fetchIntercept from 'fetch-intercept';
import { toast } from 'react-toastify';

let unregister;

export default {
  initInterceptors(history) {
    unregister = fetchIntercept.register({
      request(url, config) {
        // Modify the url or config here
        return [url, config];
      },

      requestError(error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
      },

      response(response) {
        // Modify the reponse object
        const redirect = response.headers.get('redirectTo');
        const notification = JSON.parse(response.headers.get('notification'));
        if (redirect) history.push(redirect);
        if (notification) {
          toast[notification.type](notification.message, notification.options);
        }

        return response;
      },

      responseError(error) {
        // Handle an fetch error
        return Promise.reject(error);
      }
    });
  },
  clearInterceptors() {
    unregister();
  }
};
