import axios from 'axios';
import omit from 'lodash/omit';

const fetcher = async (args) => {
  const { full, ...opts } = args;
  console.server('info', 'Fetching:', omit(opts, 'data'));

  if (opts.transformResponse) {
    opts.transformResponse = axios.defaults.transformResponse.concat(
      opts.transformResponse
    );
  }

  return axios(opts)
    .then((res) => (full ? res : res.data))
    .catch((err) => {
      const { data, ...cleanConfig } = err.config;
      const error = { ...err, config: cleanConfig };
      const method = cleanConfig.method || 'get';

      if (error.response) {
        const isHtml = (
          error.response?.headers?.['content-type'] || ''
        ).includes('text/html');

        console.error(
          'Server responded with error:',
          error.response.status,
          error.response.statusText,
          'data:',
          isHtml ? 'HTML response' : error.response.data,
          'request:',
          method,
          cleanConfig.url
        );

        return Promise.reject(error.response.data);
      }
      if (error.request) {
        console.error(
          'There was no response from server for request:',
          method,
          cleanConfig.url
        );
      } else {
        console.error('General error:', error.message, method, cleanConfig.url);
      }

      return Promise.reject(error);
    });
};

export default fetcher;
