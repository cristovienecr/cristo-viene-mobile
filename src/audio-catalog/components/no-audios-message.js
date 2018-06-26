import React from 'react';
import { compose } from 'ramda';
import { View, withTheme } from 'glamorous-native';
import { Button, Text, Icon } from 'native-base';
import { connectNetworkStatus } from '../../network';

const NoAudiosMessage = ({ retry, theme, isNetworkConnected }) => (
  <View flexDirection="column" alignSelf="stretch" alignItems="center" justifyContent="center">
    <Text style={{ fontSize: 22, color: theme.colors.palette.gray.six, margin: 10 }}>
      No hay audios disponibles
    </Text>
    {isNetworkConnected ? (
      <Button iconLeft block onPress={() => retry()}>
        <Icon name="refresh" />
        <Text bold>Intentar de Nuevo</Text>
      </Button>
    ) : (
      false
    )}
  </View>
);

const enhance = compose(connectNetworkStatus, withTheme);
export default enhance(NoAudiosMessage);
