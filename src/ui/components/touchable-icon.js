import React from 'react';
import { withTheme } from 'glamorous-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spin from './spin';

const TouchableIcon = ({ name, size, theme, disabled, loading, ...props }) => (
  <TouchableOpacity {...props} disabled={disabled || loading}>
    {loading ? (
      <Spin>
        <Icon name="loading" size={size || 20} style={{ color: theme.colors.gray }} />
      </Spin>
    ) : (
      <Icon
        name={name}
        size={size || 20}
        style={{ color: disabled ? theme.colors.gray : theme.colors.black }}
      />
    )}
  </TouchableOpacity>
);

export default withTheme(TouchableIcon);
