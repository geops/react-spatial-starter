/**
 * This function createds a FormData object to send to the server.
 *
 * @param {Object} schema A JSON schema representing a form from a django rest OPTIONS requests.
 * @param {Object} data The KVP parameters to send.
 *
 * @return {FormData} The FormData object.
 */
const createFormData = (data, schema) => {
  const formData = new FormData();

  Object.keys(data).forEach(name => {
    // Only append a property that is in the schema.
    // Only append a file property if the current data is a File object.
    if (
      schema.properties[name] &&
      (schema.properties[name].format !== 'file' || data[name] instanceof File)
    ) {
      formData.append(name, data[name]);
    }
  });
  return formData;
};

/**
 * This function send a request then:
 *   - if the request succeeds, dispatch an XXX action with the result,
 *   - if the request fails, dispatch a XXX_ERROR if the request fails.
 * @param {string} url Url of the request.
 * @param {string} method method tof the request GET,POST,PUT...
 * @param {string} type Action's name to dispatch
 * @param {Object} body Body of the request to send, a plain js object or a FormData.
 */
const fetchData = (url, method, type, body) => dispatch => {
  const fetchParams = {
    method,
    body,
  };
  return fetch(url, fetchParams)
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      const clone = res.clone();

      // If the server respond a good http response but without json or text content,
      // we return an empty object.
      return res.json().catch(() => {
        return clone.text().catch(() => {
          return Promise.resolve({});
        });
      });
    })
    .then(data => {
      return dispatch({ type, data });
    })
    .catch(res => {
      return dispatch({ type: `${type}_ERROR`, data: res.statusText });
    });
};

export { createFormData, fetchData };
