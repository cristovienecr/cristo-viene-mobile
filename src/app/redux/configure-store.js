import { compose } from 'ramda';
import { createStore } from 'redux';
import configureReducers from './configure-reducers';
import configureMiddlewares from './configure-middlewares';
import { isHotModuleReloadAvailable, isReactNative } from '../../helpers/environment';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureHotModuleReload = (store) => {
  if (!isHotModuleReloadAvailable) return;

  const replace = () => {
    // eslint-disable-next-line global-require
    const changes = require('./configure-reducers').default;
    store.replaceReducer(changes());
  };

  if (isReactNative) {
    module.hot.accept(replace);
    return;
  }
  module.hot.accept('./configure-reducers', replace);
};

const configureStore = (options = {}) => {
  const { config = {}, state = {}, middlewares = [], enhancers = [] } = options;
  const reducer = configureReducers();
  const middleware = configureMiddlewares(config, middlewares);

  const store = createStore(reducer, state, composeEnhancers(middleware, ...enhancers));

  configureHotModuleReload(store);

  return store;
};

export default configureStore;
