import { OpenColor } from '../color';
import createTheme from './create-theme';
import createThemeColors from './create-theme-colors';

const colors = createThemeColors(OpenColor);
colors.primary = '#0071bc';
colors.secundary = '#00305b';

export default createTheme({ colors });
