import queryString from 'query-string';
import { store, selectors } from '../store';

const headers = (): HeadersInit => {
  const state = store.getState();
  const user = selectors.authentication.user(state) as string;
  const password = selectors.authentication.password(state) as string;
  const site = selectors.authentication.site(state) as string;

  return {
    'Content-Type': 'application/json',
    'Wordpress-User': user,
    'Wordpress-Password': password,
    'Wordpress-Site': site
  };
};

const parseResponse = <T>(response: Response): Promise<T> => response.json();

const queryParams = (url: string, params: { [key: string]: string | number | boolean }) => {
  const { origin, pathname, search } = new URL(url);

  const existing = queryString.parse(search);

  return queryString.stringify({ ...existing, ...params });
};

export const get = <T>(
  url: string,
  { params }: { params: { [key: string]: string | number | boolean } } = { params: {} }
): Promise<T> => {
  const { origin, pathname } = new URL(url);

  const query = queryParams(url, params);

  return fetch(`${origin}${pathname}?${query}`, { method: 'GET', headers: headers() }).then(
    parseResponse
  ) as Promise<T>;
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
