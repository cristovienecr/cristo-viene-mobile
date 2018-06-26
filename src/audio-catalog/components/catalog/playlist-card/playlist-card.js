import React from 'react';
import { compose } from 'ramda';
import { connectDevice } from '../../../../device';
import LandscapePlaylistCard from './landscape-playlist-card';
import PortraitPlaylistCard from './portrait-playlist-card';
import { deepPure } from '../../../../helpers/recompose';

const PlaylistCard = ({ playlist, device }) =>
  (device.isLandscape ? (
    <LandscapePlaylistCard playlist={playlist} />
  ) : (
    <PortraitPlaylistCard playlist={playlist} device={device} />
  ));

const connect = compose(connectDevice, deepPure);
export default connect(PlaylistCard);
