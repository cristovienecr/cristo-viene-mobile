import React from 'react';
import { curry } from 'ramda';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewMoreText from './view-more-text-fork';
import { isNotNullOrEmpty } from '../../helpers/check';
import { deepPure } from '../../helpers/recompose';

const CONTROL_PADDING = 5;
const renderControl = curry((icon, onPress) => (
  <Text
    suppressHighlighting
    onPress={onPress}
    style={{ textAlign: 'center', paddingTop: CONTROL_PADDING, paddingBottom: CONTROL_PADDING }}
  >
    <Icon name={icon} size={24} />
  </Text>
));

const ReadMoreText = (props = {}) =>
  (isNotNullOrEmpty(props.children) ? (
    <ViewMoreText
      numberOfLines={3}
      renderViewMore={renderControl('chevron-down')}
      renderViewLess={renderControl('chevron-up')}
      {...props}
    />
  ) : (
    false
  ));

export default deepPure(ReadMoreText);
