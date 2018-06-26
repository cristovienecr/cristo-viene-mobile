import { compose, curry, merge, assoc, prop, values, sortWith, descend, map } from 'ramda';
import { createAction, handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { isNullOrEmpty } from '../../helpers/check';
import { Actions as TrackActions } from './tracks';
import patchStreamUri from '../patch-stream-uri';
import patchArtwork from '../patch-artwork';

const MOUNT_PATH = 'playlists';
const local = prop(MOUNT_PATH);

const handleFetchResponse = curry((Soundcloud, storePlaylists, storeTracks, response) => {
  const { tracks, playlists } = response.entities;
  if (isNullOrEmpty(tracks)) return [storePlaylists(map(patchArtwork, playlists))];
  return [
    storePlaylists(map(patchArtwork, playlists)),
    storeTracks(map(compose(patchArtwork, patchStreamUri(Soundcloud)), tracks)),
  ];
});

const STORE_PLAYLISTS = 'SOUNDCLOUD::STORE_PLAYLISTS';
const storePlaylists = createAction(STORE_PLAYLISTS);

const STORE_PLAYLIST = 'SOUNDCLOUD::STORE_PLAYLIST';
const storePlaylist = createAction(STORE_PLAYLIST);

const FETCH_PLAYLIST = 'SOUNDCLOUD::FETCH_PLAYLIST';
const fetchPlaylist = createAction(FETCH_PLAYLIST);

const FETCH_PLAYLIST_ERROR = 'SOUNDCLOUD::FETCH_PLAYLIST_ERROR';
const fetchPlaylistError = createAction(FETCH_PLAYLIST_ERROR);

const fetchPlaylistEpic = (action$, store, { Soundcloud }) =>
  action$.ofType(FETCH_PLAYLIST).switchMap(({ payload: id }) =>
    Soundcloud.playlist$(id)
      .flatMap(handleFetchResponse(Soundcloud, storePlaylists, TrackActions.storeTracks))
      .catch(e => Observable.of(fetchPlaylistError(e))),
  );

const FETCH_PLAYLISTS = 'SOUNDCLOUD::FETCH_PLAYLISTS';
const fetchPlaylists = createAction(FETCH_PLAYLISTS);

const FETCH_PLAYLISTS_ERROR = 'SOUNDCLOUD::FETCH_PLAYLISTS_ERROR';
const fetchPlaylistsError = createAction(FETCH_PLAYLISTS_ERROR);

const fetchPlaylistsEpic = (action$, store, { Soundcloud }) =>
  action$.ofType(FETCH_PLAYLISTS).switchMap(() =>
    Soundcloud.playlists$()
      .flatMap(handleFetchResponse(Soundcloud, storePlaylists, TrackActions.storeTracks))
      .catch(e => Observable.of(fetchPlaylistsError(e))),
  );

const ActionTypes = {
  STORE_PLAYLISTS,
  STORE_PLAYLIST,
  FETCH_PLAYLISTS,
  FETCH_PLAYLIST,
  FETCH_PLAYLISTS_ERROR,
  FETCH_PLAYLIST_ERROR,
};
const Actions = { storePlaylists, storePlaylist, fetchPlaylist, fetchPlaylists };
const Selectors = {
  getPlaylists: compose(
    sortWith([
      descend(prop('releaseYear')),
      descend(prop('releaseMonth')),
      descend(prop('releaseDay')),
    ]),
    values,
    local,
  ),
  getPlaylistsMap: local,
};
const epic = combineEpics(fetchPlaylistsEpic, fetchPlaylistEpic);
const reducer = handleActions(
  {
    [storePlaylists]: (state, { payload: tracks }) => merge(state, tracks),
    [storePlaylist]: (state, { payload: track }) => assoc(track.id, track, state),
  },
  {}, // initial state
);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, epic, reducer };
