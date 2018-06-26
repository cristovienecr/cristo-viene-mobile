import React from 'react';
import { StyleProvider } from 'native-base';
import { ThemeProvider as StyledThemeProvider } from 'glamorous-native';
import { connectTheme } from '../connectors';
import nativeBaseTheme from '../native-base-theme';

const ThemeProvider = ({ theme, themeName, children }) => (
  <StyledThemeProvider theme={theme} themeName={themeName}>
    <StyleProvider {...nativeBaseTheme(theme)}>{children}</StyleProvider>
  </StyledThemeProvider>
);

export default connectTheme(ThemeProvider);
