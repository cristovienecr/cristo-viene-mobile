import React from 'react';
import { curry } from 'ramda';
import { Provider as Redux } from 'react-redux';
import { ThemeProvider } from '../theme';
import { DimensionsListener } from '../../device';
import { withNetworkConnectivity } from '../../network';
import Bootstrap from './bootstrap';

const Configure = curry((App, { store }) => {
  const ConnectionAwareApp = withNetworkConnectivity(App);
  return (
    <Bootstrap store={store}>
      <Redux store={store}>
        <DimensionsListener>
          <ThemeProvider>
            <ConnectionAwareApp />
          </ThemeProvider>
        </DimensionsListener>
      </Redux>
    </Bootstrap>
  );
});

export default Configure;
