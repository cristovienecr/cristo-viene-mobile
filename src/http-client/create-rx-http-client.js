import { compose, map } from 'ramda';
import { fromPromise } from 'rxjs/observable/fromPromise';
import createHttpClient from './create-http-client';

// eslint-disable-next-line fp/no-rest-parameters
const toObservable = f => (...args) => fromPromise(f(...args));

export default compose(map(toObservable), createHttpClient);
