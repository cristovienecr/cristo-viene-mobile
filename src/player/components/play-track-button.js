import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions, Selectors } from '../redux';
import { TouchableIcon } from '../../ui';
import { connectNetworkStatus } from '../../network';
import noop from '../../helpers/noop';

const mapStateToProps = createStructuredSelector({ playingTrackId: Selectors.getPlayingTrackId });
const mapDispatchToProps = { playTrack: Actions.playTrack };
const connector = connect(mapStateToProps, mapDispatchToProps);

const PlayTrackButton = ({
  trackId,
  playingTrackId,
  playTrack,
  size,
  isNetworkConnected,
  ...props
}) => {
  if (!isNetworkConnected) return false;
  const isPlaying = playingTrackId === trackId;
  const name = isPlaying ? 'surround-sound' : 'play';
  const play = isPlaying ? noop : () => playTrack(trackId);
  return <TouchableIcon disabled={isPlaying} name={name} size={size} onPress={play} {...props} />;
};

const enhance = compose(connector, connectNetworkStatus);

export default enhance(PlayTrackButton);
