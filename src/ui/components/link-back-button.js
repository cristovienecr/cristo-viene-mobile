import React from 'react';
import { Link } from 'react-router-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Title } from 'native-base';

const ButtonContent = ({ size, ...props }) => (
  <Button transparent {...props}>
    <Title>
      <Icon name="arrow-left" size={size} />
    </Title>
  </Button>
);

const BackButton = props => <Link component={ButtonContent} {...props} />;

export default BackButton;
