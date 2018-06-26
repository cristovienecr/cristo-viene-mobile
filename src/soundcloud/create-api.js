import { curry, compose, flip, map } from 'ramda';
import camelcase from 'camelcase-keys';
import { normalize } from 'normalizr';
import { createRxHttpClient } from '../http-client';
import { Track, Tracks, Playlist, Playlists } from './schema';

const BASE_URL = 'https://api.soundcloud.com';
const normalizr = curry(flip(normalize));

const all = curry((http, userId, clientId, resource, defaults = {}) => (options = {}) =>
  http
    .get(`/users/${userId}/${resource}`, { client_id: clientId, ...defaults, ...options })
    .map(map(response => camelcase(response, { deep: true }))),
);
const single = curry((http, userId, clientId, resource, defaults = {}) => (id, options = {}) =>
  http
    .get(`/users/${userId}/${resource}/${id}`, { client_id: clientId, ...defaults, ...options })
    .map(response => camelcase(response, { deep: true })),
);

export default (clientId, userId) => {
  const http = createRxHttpClient(BASE_URL);
  const resources = all(http, userId, clientId);
  const resource = single(http, userId, clientId);
  const norm = Schema => stream$ => stream$.map(normalizr(Schema));

  return {
    playlists$: compose(norm(Playlists), resources('playlists', { representation: 'compact' })),
    playlist$: compose(norm(Playlist), resource('playlists', { representation: 'full' })),
    tracks$: compose(norm(Tracks), resources('tracks')),
    track$: compose(norm(Track), resource('tracks')),
    buildStreamUri: base => `${base}?client_id=${clientId}`,
  };
};
