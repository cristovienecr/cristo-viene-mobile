import { prop, defaultTo, compose, __ } from 'ramda';
import { Platform } from 'react-native';
import ios from './ios-elevation-scale';
import android from './android-elevation-scale';

const scale = Platform.select({ ios, android });
const resolve = compose(defaultTo(scale.dp0), prop(__, scale), key => `dp${key}`, defaultTo(0));

const elevation = { scale, resolve };

export default elevation;
