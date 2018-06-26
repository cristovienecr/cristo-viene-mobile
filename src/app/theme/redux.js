import { compose, defaultTo, identity, keys, prop, __ } from 'ramda';
import { createAction, handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { Themes, DefaultTheme } from '../../ui';
import { usePayload, createMount } from '../../helpers/redux';

const MOUNT_PATH = 'theme';
const DEFAULT_THEME = 'default';
const local = prop(MOUNT_PATH);

const CHANGE_CURRENT_THEME = 'THEME::CHANGE_CURRENT';
const changeCurrentTheme = createAction(CHANGE_CURRENT_THEME);
const current = handleAction(changeCurrentTheme, usePayload, DEFAULT_THEME);
const getCurrentThemeName = compose(prop('current'), defaultTo(DEFAULT_THEME));
const getCurrentTheme = compose(defaultTo(DefaultTheme), prop(__, Themes), getCurrentThemeName);

const themes = keys(Themes);
const options = compose(defaultTo(themes), identity);
const getThemeOptions = compose(prop('options'), defaultTo(themes));

const ActionTypes = { CHANGE_CURRENT_THEME };
const Actions = { changeCurrentTheme };
const Selectors = {
  getCurrentTheme: compose(getCurrentTheme, local),
  getCurrentThemeName: compose(getCurrentThemeName, local),
  getThemeOptions: compose(getThemeOptions, local),
};
const reducer = combineReducers({ current, options });
const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, mount, reducer };
