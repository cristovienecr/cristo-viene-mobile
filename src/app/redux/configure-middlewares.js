import { applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import configureEpics from './configure-epics';
import configureDependencies from './configure-dependencies';
import { createNetworkMiddleware } from '../../network';
import createSentry, { createSentryMiddleware } from '../../sentry';
import { isHotModuleReloadAvailable, isReactNative } from '../../helpers/environment';

const configureHotModuleReload = (epics) => {
  if (!isHotModuleReloadAvailable) return;

  const replace = () => {
    // eslint-disable-next-line global-require
    const changes = require('./configure-epics').default;
    epics.replaceEpic(changes());
  };

  if (isReactNative) {
    module.hot.accept(replace);
    return;
  }
  module.hot.accept('./configure-epics', replace);
};

const configureSentry = (config = {}) => {
  const Sentry = createSentry(config.dsn, config.options);
  return createSentryMiddleware(Sentry);
};

const configureMiddlewares = (config = {}, middlewares = []) => {
  const root = configureEpics();
  const dependencies = configureDependencies(config);
  const epics = createEpicMiddleware(root, { dependencies });
  const sentry = configureSentry(config.sentry);
  const network = createNetworkMiddleware(config.network);

  configureHotModuleReload(epics);

  return applyMiddleware(sentry, network, epics, ...middlewares);
};

export default configureMiddlewares;
