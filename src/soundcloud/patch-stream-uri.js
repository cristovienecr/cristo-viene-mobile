import { evolve } from 'ramda';

const patchStreamUri = Soundcloud =>
  evolve({
    streamUrl: Soundcloud.buildStreamUri,
  });

export default patchStreamUri;
