import React from 'react';
import { defaultProps } from 'recompose';
import { Text } from 'native-base';

const resolveCounterText = (count) => {
  if (count === 0) return 'Aún no tiene audios';
  if (count === 1) return '1 audio';
  return `${count} audios`;
};

const TrackCounter = ({ count, ...props }) => <Text {...props}>{resolveCounterText(count)}</Text>;

const enhance = defaultProps({ note: true });

export default enhance(TrackCounter);
