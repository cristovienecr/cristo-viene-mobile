import { reducer, offlineActionTypes, createNetworkMiddleware } from 'react-native-offline';
import { compose, prop } from 'ramda';
import { createMount } from '../helpers/redux';

const MOUNT_PATH = 'network';
const local = prop(MOUNT_PATH);

const ActionTypes = offlineActionTypes;
const Selectors = {
  getNetworkStatus: compose(prop('isConnected'), local),
};

const mount = createMount(reducer, MOUNT_PATH);

export { MOUNT_PATH, ActionTypes, Selectors, mount, reducer, createNetworkMiddleware };
