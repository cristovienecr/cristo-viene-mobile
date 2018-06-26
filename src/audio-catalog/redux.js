import { compose, pick, prop, merge, values, sortWith, ascend } from 'ramda';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { isNullOrEmpty } from '../helpers/check';
import { usePayload, createMount, Empty, createBooleanReducer } from '../helpers/redux';
import {
  Selectors as SoundcloudSelectors,
  Actions as SoundcloudActions,
  ActionTypes as SoundcloudActionTypes,
} from '../soundcloud';

const MOUNT_PATH = 'catalog';
const local = prop(MOUNT_PATH);

const OPEN_PLAYLIST = 'AUDIO_CATALOG::OPEN_PLAYLIST';
const openPlaylist = createAction(OPEN_PLAYLIST);

const LOAD_PLAYLIST_PENDING = 'AUDIO_CATALOG::LOAD_PLAYLIST_PENDING';
const loadPlaylistPending = createAction(LOAD_PLAYLIST_PENDING);

const LOAD_PLAYLIST_DONE = 'AUDIO_CATALOG::LOAD_PLAYLIST_DONE';
const loadPlaylistDone = createAction(LOAD_PLAYLIST_DONE);

const openPlaylistEpic = combineEpics(
  action$ =>
    action$
      .ofType(OPEN_PLAYLIST)
      .flatMap(({ payload: id }) => [loadPlaylistPending(), SoundcloudActions.fetchPlaylist(id)]),
  action$ =>
    action$
      .ofType(SoundcloudActionTypes.STORE_TRACKS, SoundcloudActionTypes.FETCH_PLAYLIST_ERROR)
      .map(loadPlaylistDone),
);

const CLOSE_PLAYLIST = 'AUDIO_CATALOG::CLOSE_PLAYLIST';
const closePlaylist = createAction(CLOSE_PLAYLIST);

const LOAD_CATALOG = 'AUDIO_CATALOG::LOAD_CATALOG';
const loadCatalog = createAction(LOAD_CATALOG);

const LOAD_CATALOG_PENDING = 'AUDIO_CATALOG::LOAD_CATALOG_PENDING';
const loadCatalogPending = createAction(LOAD_CATALOG_PENDING);

const LOAD_CATALOG_DONE = 'AUDIO_CATALOG::LOAD_CATALOG_DONE';
const loadCatalogDone = createAction(LOAD_CATALOG_DONE);

const loadCatalogEpic = combineEpics(
  action$ =>
    action$
      .ofType(LOAD_CATALOG)
      .flatMap(() => [loadCatalogPending(), SoundcloudActions.fetchPlaylists()]),
  action$ =>
    action$
      .ofType(SoundcloudActionTypes.STORE_PLAYLISTS, SoundcloudActionTypes.FETCH_PLAYLISTS_ERROR)
      .map(loadCatalogDone),
);

const isCatalogLoading = createBooleanReducer(loadCatalogPending, loadCatalogDone);
const isPlaylistLoading = createBooleanReducer(loadPlaylistPending, loadPlaylistDone);
const current = handleActions(
  {
    [openPlaylist]: usePayload,
    [closePlaylist]: Empty.string,
  },
  '',
);

const { getTracksMap, getPlaylistsMap } = SoundcloudSelectors;
const getIsCatalogLoading = compose(prop('isCatalogLoading'), local);
const getIsPlaylistLoading = compose(prop('isPlaylistLoading'), local);
const getCurrentPlaylistId = compose(prop('current'), local);
const getCurrentPlaylist = createSelector(
  getCurrentPlaylistId,
  getPlaylistsMap,
  getTracksMap,
  (id, playlists, allTracks) => {
    if (isNullOrEmpty(id)) return {};
    const playlist = prop(id, playlists);
    if (isNullOrEmpty(playlist)) return {};
    const findTracks = compose(
      sortWith([
        ascend(prop('releaseYear')),
        ascend(prop('releaseMonth')),
        ascend(prop('releaseDay')),
      ]),
      values,
      pick(playlist.tracks || []),
    );
    const tracks = findTracks(allTracks);
    return merge(playlist, { tracks });
  },
);

const ActionTypes = {
  OPEN_PLAYLIST,
  CLOSE_PLAYLIST,
  LOAD_PLAYLIST_PENDING,
  LOAD_PLAYLIST_DONE,
  LOAD_CATALOG,
  LOAD_CATALOG_PENDING,
  LOAD_CATALOG_DONE,
};
const Actions = { openPlaylist, closePlaylist, loadCatalog };
const Selectors = {
  getCurrentPlaylist,
  getCurrentPlaylistId,
  getIsCatalogLoading,
  getIsPlaylistLoading,
};
const epic = combineEpics(openPlaylistEpic, loadCatalogEpic);
const reducer = combineReducers({ current, isCatalogLoading, isPlaylistLoading });
const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, epic, mount, reducer };
