import { mergeAll, compose, defaultTo } from 'ramda';
import literal from './literal';

const combine = compose(literal, mergeAll, defaultTo([]));
export default (...styles) => combine(styles);
