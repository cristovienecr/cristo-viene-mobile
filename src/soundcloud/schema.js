import { schema } from 'normalizr';

const { Entity } = schema;

const Track = new Entity('tracks');
const Tracks = [Track];
const Playlist = new Entity('playlists', { tracks: Tracks });
const Playlists = [Playlist];

export { Track, Tracks, Playlist, Playlists };
