import { mergeDeepRight } from 'ramda';
import { OpenColor } from '../color';
import Elevation from '../elevation';
import createThemeColors from './create-theme-colors';

const Colors = createThemeColors(OpenColor);

const createTheme = (overrides = {}) => {
  const { colors = Colors, elevation = Elevation } = overrides;
  const theme = {
    colors,
    elevation,
    states: {
      active: { darken: 0.2, opacity: 0.7 },
      disabled: { cursor: 'default', opacity: 0.5 },
    },
    text: {
      color: colors.black,
      contrast: colors.white,
    },
    paper: { borderRadius: 2, backgroundColor: colors.white, padding: 10 },
    player: {
      slider: {
        style: {
          height: 30,
        },
        trackStyle: {
          height: 2,
          backgroundColor: colors.gray,
        },
        thumbStyle: {
          width: 10,
          height: 10,
          backgroundColor: colors.secundary,
          borderRadius: 10 / 2,
          shadowColor: colors.secundary,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 2,
          shadowOpacity: 1,
        },
        thumbTouchSize: { width: 40, height: 40 },
        minimumTrackTintColor: colors.secundary,
        maximumTrackTintColor: undefined,
        thumbTintColor: undefined,
      },
    },
    noNetworkMessage: {
      style: {
        backgroundColor: Colors.palette.gray.three,
        padding: 3,
      },
      textStyle: {
        fontWeight: 'bold',
        color: Colors.palette.gray.six,
      },
    },
  };
  return mergeDeepRight(theme, overrides);
};

export default createTheme;
