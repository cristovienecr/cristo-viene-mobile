import { evolve, replace, unless } from 'ramda';
import { isNullOrEmpty } from '../helpers/check';

const patchStreamUri = evolve({
  artworkUrl: unless(isNullOrEmpty, replace('large', 't500x500')),
});

export default patchStreamUri;
