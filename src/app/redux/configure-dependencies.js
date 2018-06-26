import createSoundcloud from '../../soundcloud';
import { isNullOrEmpty } from '../../helpers/check';

const configureDependencies = (config = {}) => {
  const { soundcloud } = config;
  if (isNullOrEmpty(soundcloud)) return {};
  const Soundcloud = createSoundcloud(soundcloud.key, soundcloud.userId);
  return { Soundcloud };
};

export default configureDependencies;
