import React from 'react';
import { AppRegistry } from 'react-native';
import { SOUNDCLOUD__CLIENT_ID, SOUNDCLOUD__USER_ID, SENTRY_DSN } from 'react-native-dotenv';
import raf from './redux-raf-enhancer';
import { Root, configureStore, OfflineSensibleActionTypes } from './app';
// import { isDevelopment } from './helpers/environment';
//
// if (isDevelopment) {
//   // eslint-disable-next-line no-unused-vars
//   let createClass = React.createClass;
//   Object.defineProperty(React, 'createClass', {
//     set: (nextCreateClass) => {
//       createClass = nextCreateClass;
//     },
//   });
//   // eslint-disable-next-line global-require, import/no-extraneous-dependencies
//   const { whyDidYouUpdate } = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const config = {
  soundcloud: { key: SOUNDCLOUD__CLIENT_ID, userId: SOUNDCLOUD__USER_ID },
  sentry: { dsn: SENTRY_DSN },
  network: { actionTypes: OfflineSensibleActionTypes },
};

const store = configureStore({
  config,
  enhancers: [raf()],
  state: {
    theme: { current: 'CristoViene' },
  },
});

const CristoVieneMobile = () => <Root store={store} />;

AppRegistry.registerComponent('CristoVieneMobile', () => CristoVieneMobile);
