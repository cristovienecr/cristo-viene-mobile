import { shouldUpdate } from 'recompose';
import { equals, not, compose } from 'ramda';

export default shouldUpdate(compose(not, equals));
