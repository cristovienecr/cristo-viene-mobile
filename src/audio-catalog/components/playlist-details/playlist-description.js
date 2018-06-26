import React from 'react';
import { compose } from 'ramda';
import { StyleSheet } from 'react-native';
import { View, withTheme } from 'glamorous-native';
import { ReadMoreText } from '../../../ui';
import { deepPure } from '../../../helpers/recompose';

const DEFAULT_PADDING = 20;

const PlaylistDescription = ({ theme, playlist, ...props }) => (
  <View
    paddingTop={DEFAULT_PADDING}
    paddingLeft={DEFAULT_PADDING}
    paddingRight={DEFAULT_PADDING}
    borderBottomColor={theme.colors.gray}
    borderBottomWidth={StyleSheet.hairlineWidth}
  >
    <ReadMoreText {...props}>{playlist.description}</ReadMoreText>
  </View>
);

const enhance = compose(withTheme, deepPure);
export default enhance(PlaylistDescription);
