import { tap } from 'ramda';

// eslint-disable-next-line no-console
export default message => tap(x => console.log(message, x));
