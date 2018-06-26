import React from 'react';
import styled, { View } from 'glamorous-native';
import { defaultProps } from 'recompose';
import { Card, Left, Body, Text } from 'native-base';
import { LinkCardItem, Artwork, Title } from '../../../../ui';
import { deepPure } from '../../../../helpers/recompose';
import TrackCounter from '../../track-counter';

const LANDSCAPE_ARTWORK_SIZE = 200;

const Description = defaultProps({ numberOfLines: 5, ellipsizeMode: 'tail' })(
  styled.text({ fontSize: 14, paddingTop: 20 }, (_, theme) => ({ color: theme.text.color })),
);

const LandscapePlaylistCard = ({ playlist }) => (
  <Card>
    <LinkCardItem to={`/audio-catalog/${playlist.id}`} cardBody>
      <View flexDirection="row">
        <Artwork uri={playlist.artworkUrl} size={LANDSCAPE_ARTWORK_SIZE} style={{ margin: 5 }} />
        <Left>
          <Body>
            <Title>{playlist.title}</Title>
            <Text note>{playlist.releaseYear}</Text>
            <TrackCounter count={playlist.trackCount} />
            <Description>{playlist.description}</Description>
          </Body>
        </Left>
      </View>
    </LinkCardItem>
  </Card>
);

export default deepPure(LandscapePlaylistCard);
