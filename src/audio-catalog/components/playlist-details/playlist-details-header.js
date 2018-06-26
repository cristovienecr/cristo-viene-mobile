import React from 'react';
import { Header, Body, Title } from 'native-base';
import { LinkBackButton, Artwork } from '../../../ui';
import { deepPure } from '../../../helpers/recompose';

const PlaylistDetailsHeader = ({ title, artwork }) => (
  <Header>
    <LinkBackButton to="/audio-catalog" size={25} />
    <Artwork uri={artwork} size={40} alignSelf="center" marginRight={10} marginLeft={10} />
    <Body>
      <Title>{title}</Title>
    </Body>
  </Header>
);

export default deepPure(PlaylistDetailsHeader);
