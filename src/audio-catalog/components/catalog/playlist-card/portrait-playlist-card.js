import React from 'react';
import { View } from 'glamorous-native';
import { Dimensions } from 'react-native';
import { Card, Body, Text } from 'native-base';
import { LinkCardItem, Artwork, Title } from '../../../../ui';
import TrackCounter from '../../track-counter';
import { isNullOrEmpty } from '../../../../helpers/check';
import { deepPure } from '../../../../helpers/recompose';

const resolveDeviceWidth = device =>
  (isNullOrEmpty(device) ? Dimensions.get('window').width : device.width);

const PortraitPlaylistCard = ({ playlist, device }) => {
  const size = resolveDeviceWidth(device) - 25;
  const route = `/audio-catalog/${playlist.id}`;
  return (
    <Card>
      <LinkCardItem to={route} cardBody>
        <Body style={{ margin: 5 }}>
          <Artwork uri={playlist.artworkUrl} size={size} />
          <View padding={10}>
            <Title>{playlist.title}</Title>
            <Text note>{playlist.releaseYear}</Text>
            <TrackCounter count={playlist.trackCount} />
          </View>
        </Body>
      </LinkCardItem>
    </Card>
  );
};
export default deepPure(PortraitPlaylistCard);
