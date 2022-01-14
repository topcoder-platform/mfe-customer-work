import config from "../../config";
import { axiosInstance as axios, CancelToken } from "./requestInterceptor";

/**
 * Fetches all works created by the user with the specified user handle.
 *
 * @param {string} handle user handle
 * @param {Object} [pagination] pagination object
 * @param {Object} [cancelSource] axios' cancel source
 * @returns {[Promise, Object]} an array with request promise and cancel source
 */
export function getWorks(handle, pagination, cancelSource) {
  if (!cancelSource) {
    cancelSource = CancelToken.source();
  }
  const { page = 1, perPage = 100 } = pagination || {};
  const promise = axios
    .get(
      `${config.API.V5}/challenges?createdBy=${handle}` +
        `&perPage=${perPage}&page=${page}&selfService=true`,
      { cancelToken: cancelSource.token }
    )
    .then((response) => {
      const headers = response.headers;
      return {
        data: response.data,
        pagination: {
          page: +headers["x-page"] || 1,
          perPage: +headers["x-per-page"] || perPage,
          total: +headers["x-total"] || 0,
          totalPages: +headers["x-total-pages"] || 0,
        },
      };
    });
  return [promise, cancelSource];
}
