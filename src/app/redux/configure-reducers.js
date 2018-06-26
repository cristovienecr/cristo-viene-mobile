import { compose, defaultTo } from 'ramda';
import { combineReducers } from 'redux';
import { mount as theme } from '../theme';
import { mount as device } from '../../device';
import { mount as network } from '../../network';
import { mount as soundcloud } from '../../soundcloud';
import { mount as catalog } from '../../audio-catalog';
import { mount as player } from '../../player';

const mount = compose(theme, device, network, soundcloud, catalog, player, defaultTo({}));

const configureReducers = () => combineReducers(mount());

export default configureReducers;
