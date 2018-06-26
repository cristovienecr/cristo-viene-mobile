import { compose, merge, assoc, prop, values } from 'ramda';
import { createAction, handleActions } from 'redux-actions';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import patchStreamUri from '../patch-stream-uri';
import patchArtwork from '../patch-artwork';

const MOUNT_PATH = 'tracks';
const local = prop(MOUNT_PATH);

const STORE_TRACKS = 'SOUNDCLOUD::STORE_TRACKS';
const storeTracks = createAction(STORE_TRACKS);

const STORE_TRACK = 'SOUNDCLOUD::STORE_TRACK';
const storeTrack = createAction(STORE_TRACK);

const FETCH_TRACK = 'SOUNDCLOUD::FETCH_TRACK';
const fetchTrack = createAction(FETCH_TRACK);

const FETCH_TRACK_ERROR = 'SOUNDCLOUD::FETCH_TRACK_ERROR';
const fetchTrackError = createAction(FETCH_TRACK_ERROR);

const fetchTrackEpic = (action$, store, { Soundcloud }) =>
  action$.ofType(FETCH_TRACK).switchMap(({ payload: id }) =>
    Soundcloud.track$(id)
      .map(compose(patchArtwork, patchStreamUri(Soundcloud)))
      .map(storeTrack)
      .catch(e => Observable.of(fetchTrackError(e))),
  );

const ActionTypes = { STORE_TRACKS, STORE_TRACK, FETCH_TRACK, FETCH_TRACK_ERROR };
const Actions = { storeTracks, storeTrack, fetchTrack };
const Selectors = { getTracks: compose(values, local), getTracksMap: local };
const epic = combineEpics(fetchTrackEpic);
const reducer = handleActions(
  {
    [storeTracks]: (state, { payload: tracks }) => merge(state, tracks),
    [storeTrack]: (state, { payload: track }) => assoc(track.id, track, state),
  },
  {}, // initial state
);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, epic, reducer };
