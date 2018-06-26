import { prop, pick, ifElse, compose, defaultTo } from 'ramda';
import { Platform } from 'react-native';
import { isNullOrEmpty } from './check';

const { OS } = Platform;
export const isAndroid = OS === 'android';
export const isIOS = OS === 'ios';
export const isHotModuleReloadAvailable = module.hot && typeof module.hot.accept === 'function';
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// HACK: This function was created as a work-around for an issue in android regarding the
// event object argument provided to DeviceEventEmitter event callbacks.
export const resolveDimensionsEvent = compose(
  defaultTo({}),
  pick(['width', 'height']),
  defaultTo({}),
  ifElse(
    () => isAndroid,
    (dimensions) => {
      if (isNullOrEmpty(dimensions)) return dimensions;
      return {
        width: dimensions.windowPhysicalPixels.width / dimensions.windowPhysicalPixels.scale,
        height: dimensions.windowPhysicalPixels.height / dimensions.windowPhysicalPixels.scale,
        scale: dimensions.windowPhysicalPixels.scale,
        fontScale: dimensions.windowPhysicalPixels.fontScale,
      };
    },
    prop('window'),
  ),
  defaultTo({}),
);
