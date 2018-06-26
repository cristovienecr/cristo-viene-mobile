const createThemeColors = palette => ({
  primary: palette.blue.four,
  secundary: palette.blue.nine,
  info: palette.blue.two,
  success: palette.green.five,
  warning: palette.orange.six,
  danger: palette.red.six,
  black: palette.gray.seven,
  white: palette.white,
  gray: palette.gray.five,
  palette,
});

export default createThemeColors;
