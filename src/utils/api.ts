//defines the base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
 async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/////////////////
// LINKS
/////////////////

/**
 * Retrieves all links.
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possible empty array of links from the database.
 */
 export async function listLinks(signal) {
  const url = new URL(`${API_BASE_URL}/links`);
  return await fetchJson(url, { signal }, []);
}

/**
 * Saves link to the database.
 * @param link
 *  the link to save (title, hyperlink) (user id is passed with header auth-token)
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<link>}
 *  a promise that resolves the saved link, which will now have an `id` property.
 */
 export async function createLink(link: object, signal) {
  const url = new URL(`${API_BASE_URL}/links`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: link }),
    signal,
  };
  return await fetchJson(url, options, {});
}

/////////////////
// USERS
/////////////////

/**
 * Registers new user
 * @param user
 *  the user to save (name, username, email, password, repeat_password)
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<user>}
 *  a promise that resolves the saved user, which will now have an `id` property.
 */
 export async function createuser(user: object, signal) {
  const url = new URL(`${API_BASE_URL}/user/register`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    signal,
  };
  return await fetchJson(url, options, {});
}

/**
 * Login existing user
 * @param user
 *  the user to login (email and password)
 * @param signal
 *  optional AbortController.signal
 */
 export async function createuser(user: object, signal) {
  const url = new URL(`${API_BASE_URL}/user/login`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: user }),
    signal,
  };
  return await fetchJson(url, options, {});
}