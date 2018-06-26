import { defaultTo } from 'ramda';
import styled from 'glamorous-native';
import { PLAYER_HEIGHT } from '../../constants';

const BottomFixedPanel = styled.view(
  {
    borderWidth: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  ({ height }) => ({
    height: defaultTo(PLAYER_HEIGHT, height),
  }),
);

export default BottomFixedPanel;
