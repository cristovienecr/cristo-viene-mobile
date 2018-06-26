import { prop, compose } from 'ramda';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';
import { usePayload, createMount, Empty } from '../helpers/redux';
import { Selectors as SoundcloudSelectors } from '../soundcloud';
import { isNotNullOrEmpty } from '../helpers/check';

const MOUNT_PATH = 'player';
const local = prop(MOUNT_PATH);

const PLAY_TRACK = 'PLAYER::PLAY_TRACK';
const playTrack = createAction(PLAY_TRACK);

const CLOSE_PLAYER = 'PLAYER::CLOSE_PLAYER';
const closePlayer = createAction(CLOSE_PLAYER);

const track = handleActions(
  {
    [playTrack]: usePayload,
    [closePlayer]: Empty.string,
  },
  '',
);

const { getTracksMap } = SoundcloudSelectors;
const getPlayingTrackId = compose(prop('track'), local);
const getPlayingTrack = createSelector(getPlayingTrackId, getTracksMap, prop);
const isPlayerOpen = compose(isNotNullOrEmpty, getPlayingTrackId);

const ActionTypes = { PLAY_TRACK, CLOSE_PLAYER };
const Actions = { playTrack, closePlayer };
const Selectors = { getPlayingTrack, getPlayingTrackId, isPlayerOpen };
const reducer = combineReducers({ track });
const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, mount, reducer };
