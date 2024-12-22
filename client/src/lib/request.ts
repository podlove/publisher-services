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
const checkResponse = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response;
};

const parseResponse = <T>(response: Response): Promise<T> => response.json();

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
    .then(checkResponse)
    .then(parseResponse) as Promise<T>;
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
  }).then(parseResponse<T>);
};
