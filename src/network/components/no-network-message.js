import React from 'react';
import { compose, path } from 'ramda';
import { View, Text, withTheme } from 'glamorous-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connectNetworkStatus } from '../connectors';

const NoNetworkMessage = ({ isNetworkConnected, theme }) => {
  const containerStyle = path(['noNetworkMessage', 'style'], theme) || {};
  const textStyle = path(['noNetworkMessage', 'textStyle'], theme) || {};

  if (isNetworkConnected) return false;
  return (
    <View alignItems="center" {...containerStyle}>
      <Text {...textStyle}>
        <Icon name="cloud-off-outline" /> Sin conexión
      </Text>
    </View>
  );
};

const enhance = compose(connectNetworkStatus, withTheme);
export default enhance(NoNetworkMessage);
