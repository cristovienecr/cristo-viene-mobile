import { Sentry } from 'react-native-sentry';
import { isNullOrEmpty } from '../helpers/check';

const configure = (dsn, options = {}) => {
  if (isNullOrEmpty(dsn)) return undefined;
  Sentry.config(dsn, options).install();
  return Sentry;
};

export default configure;
