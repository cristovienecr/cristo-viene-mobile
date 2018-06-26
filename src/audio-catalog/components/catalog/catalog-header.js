import React from 'react';
import styled from 'glamorous-native';
import { Header, Body, Title } from 'native-base';
import logo from '../../../ui/assets/images/logo.png';
import { deepPure } from '../../../helpers/recompose';

const Logo = styled.image({
  height: 30,
  width: 65,
  alignSelf: 'center',
  marginRight: 10,
});

const CatalogHeader = () => (
  <Header>
    <Logo source={logo} />
    <Body>
      <Title>Audios</Title>
    </Body>
  </Header>
);

export default deepPure(CatalogHeader);
