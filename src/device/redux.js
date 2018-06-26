import { compose, prop } from 'ramda';
import { Dimensions } from 'react-native';
import { createSelector } from 'reselect';
import { createAction, handleAction } from 'redux-actions';
import { usePayload, createMount } from '../helpers/redux';

const current = Dimensions.get('window');
const orientation = (height, width) => (height > width ? 'portrait' : 'landscape');

const MOUNT_PATH = 'device';
const local = prop(MOUNT_PATH);

const InitialState = {
  width: current.width,
  height: current.height,
  orientation: orientation(current.height, current.width),
};

const CHANGE_DIMENSIONS = 'DEVICE::CHANGE_DIMENSIONS';
const changeDimensions = createAction(CHANGE_DIMENSIONS, ({ height, width }) => ({
  height,
  width,
  orientation: height > width ? 'portrait' : 'landscape',
}));

const ActionTypes = { CHANGE_DIMENSIONS };
const Actions = { changeDimensions };
const Selectors = {
  getDevice: createSelector(local, device => ({
    ...device,
    isPortrait: device.orientation === 'portrait',
    isLandscape: device.orientation === 'landscape',
  })),
  getOrientation: compose(prop('orientation'), local),
};

const reducer = handleAction(changeDimensions, usePayload, InitialState);
const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Actions, Selectors, mount, reducer };
