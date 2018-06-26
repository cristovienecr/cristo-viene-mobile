import { compose, prop, mapObjIndexed as map } from 'ramda';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import * as Playlists from './playlists';
import * as Tracks from './tracks';
import { createMount } from '../../helpers/redux';

const MOUNT_PATH = 'soundcloud';
const local = prop(MOUNT_PATH);

const reducers = {
  [Playlists.MOUNT_PATH]: Playlists.reducer,
  [Tracks.MOUNT_PATH]: Tracks.reducer,
};

const globalize = map(selector => compose(selector, local));

const ActionTypes = { ...Playlists.ActionTypes, ...Tracks.ActionTypes };
const Actions = { ...Playlists.Actions, ...Tracks.Actions };
const Selectors = { ...globalize(Playlists.Selectors), ...globalize(Tracks.Selectors) };
const epic = combineEpics(Playlists.epic, Tracks.epic);
const reducer = combineReducers(reducers);
const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, epic, mount, reducer };
