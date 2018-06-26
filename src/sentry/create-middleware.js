import { identity, prop, compose, equals, T, mergeDeepRight } from 'ramda';
import { isFSA } from 'flux-standard-action';
import { isNullOrEmpty } from '../helpers/check';
import noop from '../helpers/noop';

const bypass = () => next => action => next(action);
const isErrorAction = compose(equals(true), prop('error'));
const defaults = {
  mapState: identity,
  mapAction: identity,
  breadcrumb: {
    category: 'redux',
    filter: T,
    mapData: noop,
  },
};

const createMiddleware = (Sentry, options = {}) => {
  if (isNullOrEmpty(Sentry)) return bypass;

  const { mapState, mapAction, breadcrumb } = mergeDeepRight(defaults, options);
  return (store) => {
    let lastAction;

    Sentry.setDataCallback((data, original) => {
      const extra = {
        lastAction: mapAction(lastAction),
        state: mapState(store.getState()),
      };
      const merged = mergeDeepRight(data, { extra });
      return original ? original(merged) : merged;
    });

    return next => (action) => {
      if (!isFSA(action)) return next(action);
      if (isErrorAction(action)) {
        Sentry.captureException(action.payload);
        return next(action);
      }

      if (breadcrumb.filter(action)) {
        Sentry.captureBreadcrumb({
          category: 'redux',
          message: action.type,
          data: breadcrumb.mapData(action),
        });
      }

      lastAction = action;
      return next(action);
    };
  };
};

export default createMiddleware;
