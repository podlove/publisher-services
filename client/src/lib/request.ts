import queryString from 'query-string';
import { store, selectors } from '../store';

const headers = (): HeadersInit => {
  const state = store.getState();
  const user = selectors.authentication.user(state) as string;
  const password = selectors.authentication.password(state) as string;
  const site = selectors.authentication.site(state) as string;
  const rest_endpoint = selectors.authentication.restEndpoint(state) as string;

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(user ? { 'Wordpress-User': user } : {}),
    ...(password ? { 'Wordpress-Password': password } : {}),
    ...(site ? { 'Wordpress-Site': site } : {}),
    ...(rest_endpoint ? { 'Wordpress-Rest': rest_endpoint } : {})
  };
};

function checkStatus(response: Response): Response {
  if (response.ok) {
    // response.ok is true if status code is 2xx
    return response;
  }

  // Create an error with the status text and status code
  const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  // You can attach the response to the error for more details if needed
  (error as any).response = response;
  throw error;
}

async function parseResponse<T>(response: Response): Promise<T> {
  // First check if the response is OK (status 200-299)
  checkStatus(response);

  // Then parse the JSON
  try {
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to parse response as JSON: ${error}`);
  }
}

export const origin = (path: string): string => {
  const url = new URL(document.baseURI).origin;

  return new URL(path, url).href;
};

const queryParams = (url: string, params: { [key: string]: string | number | boolean }) => {
  const { search } = new URL(url);

  const existing = queryString.parse(search);

  return queryString.stringify({ ...existing, ...params });
};

export const get = <T>(
  url: string,
  { params }: { params: { [key: string]: string | number | boolean } } = { params: {} }
): Promise<T> => {
  const { origin, pathname } = new URL(url);

  const query = queryParams(url, params);

  return fetch(`${origin}${pathname}${query ? '?' : ''}${query}`, {
    method: 'GET',
    headers: headers()
  })
    .then(checkStatus)
    .then((response) => response.json()) as Promise<T>;
};

export const post = <T>(
  url: string,
  {
    params,
    data
  }: { params: { [key: string]: string | number | boolean }; data: { [key: string]: any } } = {
    params: {},
    data: {}
  }
): Promise<T> => {
  const { origin, pathname } = new URL(url);

  const query = queryParams(url, params);

  return fetch(`${origin}${pathname}?${query}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data)
  })
    .then(checkStatus)
    .then((response) => response.json());
};
