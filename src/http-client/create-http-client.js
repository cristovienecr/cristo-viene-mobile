import { prop } from 'ramda';
import {
  base,
  query,
  json,
  accept,
  header,
  method,
  parseJSON,
  createStack,
  createFetch,
  handleResponse,
} from 'http-client';

const createCoreStack = host =>
  createStack(
    base(host),
    accept('application/json'),
    header('Content-Type', 'application/json; charset=utf-8'),
  );

const createJsonStack = host =>
  createStack(createCoreStack(host), parseJSON(), handleResponse(prop('jsonData')));

const createGetStack = options =>
  createStack(header('If-Modified-Since', '0'), method('GET'), query(options));
const createPostStack = options => createStack(method('POST'), json(options));
const createPutStack = options => createStack(method('PUT'), json(options));
const createDeleteSack = options => createStack(method('DELETE'), json(options));

const get = host => (endpoint, options) => {
  const fetch = createFetch(createJsonStack(host), createGetStack(options));
  return fetch(endpoint);
};

const post = host => (endpoint, data) => {
  const fetch = createFetch(createJsonStack(host), createPostStack(data));
  return fetch(endpoint);
};

const put = host => (endpoint, data) => {
  const fetch = createFetch(createJsonStack(host), createPutStack(data));
  return fetch(endpoint);
};

const remove = host => (endpoint, data) => {
  const fetch = createFetch(createJsonStack(host), createDeleteSack(data));
  return fetch(endpoint);
};

export { createCoreStack, createGetStack, createPostStack, createPutStack, createDeleteSack };
export default function createHttpClient(host) {
  return { get: get(host), post: post(host), put: put(host), delete: remove(host) };
}
