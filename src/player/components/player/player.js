import React, { Component } from 'react';
import { equals, compose, path } from 'ramda';
import { TouchableWithoutFeedback } from 'react-native';
import { View, withTheme } from 'glamorous-native';
import { Text } from 'native-base';
import Slider from 'react-native-slider';
import AudioControl from 'react-native-music-control'; // eslint-disable-line
import { Player as Engine, MediaStates } from 'react-native-audio-toolkit';
import time from 'date-fns/format';
import { isNotNullOrEmpty, isNullOrEmpty } from '../../../helpers/check';
import { connectPlayer } from '../../connectors';
import { PLAYER_HEIGHT } from '../../constants';
import { Artwork, Title, TouchableIcon } from '../../../ui';
import defaultArtwork from '../../../ui/assets/images/default-artwork.png';
import BottomFixedPanel from './bottom-fixed-panel';

const resolveAudioControlState = (state) => {
  if (state === MediaStates.PLAYING) return AudioControl.STATE_PLAYING;
  if (state === MediaStates.PAUSED) return AudioControl.STATE_PAUSED;
  if (state === MediaStates.ERROR) return AudioControl.STATE_ERROR;
  if (state === MediaStates.PREPARING) return AudioControl.STATE_BUFFERING;
  return AudioControl.STATE_STOPPED;
};

const createInitialState = () => ({
  mainButton: {
    icon: 'play',
    disabled: true,
  },
  stopButton: {
    disabled: true,
  },
  loading: false,
  progress: 0,
  error: '',
});

const createEngine = track =>
  (isNotNullOrEmpty(track)
    ? new Engine(track.streamUrl, { autoDestroy: false, continuesToPlayInBackground: true })
    : {});

const resolveMainButtonState = engine => ({
  icon: isNotNullOrEmpty(engine) && engine.isPlaying ? 'pause' : 'play',
  disabled: isNullOrEmpty(engine) || !engine.canPlay,
});

const resolveStopButtonState = engine => ({
  disabled: isNullOrEmpty(engine) || !engine.canStop,
});

const resolveLoadingState = engine =>
  isNotNullOrEmpty(engine) &&
  (engine.state === MediaStates.PREPARING || engine.state === MediaStates.SEEKING);

const shouldUpdateProgress = lastSeek => Date.now() - lastSeek > 200;

const calculateProgress = engine =>
  (isNotNullOrEmpty(engine) ? Math.max(0, engine.currentTime) / engine.duration : 0);

class Player extends Component {
  constructor(props) {
    super();
    this.state = createInitialState(props);
    this.sync = this.sync.bind(this);
    this.seek = this.seek.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.close = this.close.bind(this);
    this.playPause = this.playPause.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.startProgressUpdater = this.startProgressUpdater.bind(this);
    this.stopProgressUpdater = this.stopProgressUpdater.bind(this);
    this.startEngine = this.startEngine.bind(this);
    this.handleSliderTouch = this.handleSliderTouch.bind(this);
  }

  componentDidMount() {
    AudioControl.enableControl('play', true);
    AudioControl.enableControl('pause', true);
    AudioControl.enableControl('stop', false);
    AudioControl.enableControl('nextTrack', false);
    AudioControl.enableControl('previousTrack', false);
    AudioControl.enableControl('seekForward', false); // iOS only
    AudioControl.enableControl('seekBackward', false); // iOS only
    AudioControl.enableControl('seek', true); // Android only
    AudioControl.enableControl('skipForward', false);
    AudioControl.enableControl('skipBackward', false);
    AudioControl.enableControl('setRating', false);
    AudioControl.enableControl('volume', false); // Only affected when remoteVolume is enabled
    AudioControl.enableControl('remoteVolume', false);
    AudioControl.enableControl('enableLanguageOption', false);
    AudioControl.enableControl('disableLanguageOption', false);
    AudioControl.enableBackgroundMode(true);

    AudioControl.on('play', this.play);
    AudioControl.on('pause', this.pause);
    AudioControl.on('stop', this.stop);
    AudioControl.on('seek', seconds => this.seek(seconds * 1000));
    AudioControl.on('togglePlayPause', this.playPause);
    AudioControl.on('closeNotification', () => {
      AudioControl.resetNowPlaying();
      this.stop();
    });

    const { track } = this.props;
    this.startEngine(track);
  }

  componentWillReceiveProps(props) {
    const { track } = props;
    if (isNullOrEmpty(track) || equals(this.props.track, track)) return;
    this.startEngine(track);
  }

  shouldComponentUpdate(props, state) {
    const propsEquals = equals(props.track, this.props.track);
    const stateEquals = equals(state, this.state);
    const shouldUpdate = !(propsEquals && stateEquals);
    return shouldUpdate;
  }

  sync(error) {
    if (isNullOrEmpty(this.engine)) return;
    const { track } = this.props;
    if (this.engine.state === MediaStates.PLAYING && isNotNullOrEmpty(track)) {
      AudioControl.setNowPlaying({
        title: track.title,
        artist: 'Cristo Viene',
        artwork: isNotNullOrEmpty(track.artworkUrl) ? track.artworkUrl : defaultArtwork,
        description: track.description,
      });
    }

    AudioControl.updatePlayback({
      state: resolveAudioControlState(this.engine.state),
      duration: this.engine.duration / 1000,
      elapsedTime: this.engine.currentTime / 1000,
    });

    this.setState({
      mainButton: resolveMainButtonState(this.engine),
      stopButton: resolveStopButtonState(this.engine),
      loading: resolveLoadingState(this.engine),
      error: isNotNullOrEmpty(error) ? error.message : '', // eslint-disable-line react/no-unused-state
    });
  }

  seek(percentage) {
    if (isNullOrEmpty(this.engine)) return;
    this.stopProgressUpdater();
    this.lastSeek = Date.now();

    const position = percentage * this.engine.duration;
    this.engine.seek(position, (error) => {
      if (isNotNullOrEmpty(error)) this.sync(error);
      else {
        this.sync();
        this.play();
        this.updateProgress();
      }
    });
  }

  stop() {
    if (isNullOrEmpty(this.engine)) return;
    this.engine.stop(() => {
      this.sync();
      this.stopProgressUpdater();
      this.updateProgress();
    });
  }

  play() {
    if (isNullOrEmpty(this.engine)) return;
    this.engine.play((error) => {
      if (isNotNullOrEmpty(error)) this.sync(error);
      else {
        this.sync();
        this.startProgressUpdater();
      }
    });
  }

  pause() {
    if (isNullOrEmpty(this.engine)) return;
    this.engine.pause(() => {
      this.stopProgressUpdater();
      this.sync();
    });
  }

  playPause() {
    if (isNullOrEmpty(this.engine)) return;
    this.engine.playPause((error) => {
      if (isNotNullOrEmpty(error)) {
        this.sync(error);
        return;
      }

      if (this.engine.state === MediaStates.PLAYING) this.startProgressUpdater();
      else this.stopProgressUpdater();
      this.sync();
    });
  }

  close() {
    AudioControl.resetNowPlaying();
    this.stop();
    this.props.closePlayer();
  }

  startProgressUpdater() {
    if (isNotNullOrEmpty(this.progressInterval)) this.stopProgressUpdater();
    this.progressInterval = setInterval(this.updateProgress, 950);
  }

  stopProgressUpdater() {
    if (isNullOrEmpty(this.progressInterval)) return;
    clearInterval(this.progressInterval);
    delete this.progressInterval;
  }

  updateProgress() {
    const { engine, lastSeek = 0 } = this;
    if (isNullOrEmpty(engine) || !shouldUpdateProgress(lastSeek)) return;
    this.setState({ progress: calculateProgress(engine) });
  }

  startEngine(track) {
    if (isNullOrEmpty(track)) return;
    if (isNotNullOrEmpty(this.engine)) {
      AudioControl.resetNowPlaying();
      this.stopProgressUpdater();
      this.engine.destroy();
    }

    this.engine = createEngine(track);

    this.engine.prepare((error) => {
      if (isNotNullOrEmpty(error)) this.sync(error);
      else this.play();
    });
    this.engine.on('error', this.sync);
    this.engine.on('ended', this.sync);
    this.engine.on('pause', this.sync);
    this.sync();
  }

  handleSliderTouch(e) {
    if (isNullOrEmpty(this.slider) || isNullOrEmpty(e)) return;
    const locationX = path(['nativeEvent', 'locationX'], e);
    if (isNullOrEmpty(locationX)) return;

    this.slider.measure((x, y, width) => {
      const percentage = (locationX - x - 15) / width;
      this.seek(percentage);
    });
  }

  render() {
    const { track, theme } = this.props;
    if (isNullOrEmpty(track)) return false;
    const sliderTheme = path(['player', 'slider'], theme) || {};
    return (
      <BottomFixedPanel height={PLAYER_HEIGHT}>
        <View
          justifyContent="center"
          alignSelf="stretch"
          borderWidth={0}
          flexDirection="row"
          padding={5}
        >
          <View padding={5} borderWidth={0}>
            <Artwork size={PLAYER_HEIGHT - 10} uri={track.artworkUrl} />
          </View>
          <View flex={1} flexDirection="column" borderWidth={0} padding={5}>
            <Title>{track.title}</Title>
            <View
              ref={(slider) => {
                if (isNullOrEmpty(slider)) return;
                this.slider = slider.innerComponent;
              }}
              opacity={1}
              flex={1}
              zIndex={999}
              height={10}
              marginRight={5}
              borderWidth={0}
              justifyContent="center"
            >
              <TouchableWithoutFeedback onPress={this.handleSliderTouch}>
                <Slider
                  {...sliderTheme}
                  step={0.0001}
                  disabled={this.state.mainButton.disabled}
                  onValueChange={this.seek}
                  value={this.state.progress}
                />
              </TouchableWithoutFeedback>
            </View>
            <View flex={1} flexDirection="row">
              <View flex={1} alignItems="flex-start">
                <Text note style={{ fontSize: 10 }}>
                  {time(Math.max(0, this.engine.currentTime), 'mm:ss')}
                </Text>
              </View>
              <View flex={1} alignItems="flex-end">
                <Text note style={{ fontSize: 10 }}>
                  {time(track.duration, 'mm:ss')}
                </Text>
              </View>
            </View>
            <View alignSelf="stretch" flexDirection="row">
              <View flex={1} alignSelf="stretch" alignItems="flex-start" flexDirection="row">
                <TouchableIcon
                  name={this.state.mainButton.icon}
                  loading={this.state.loading}
                  size={40}
                  disabled={this.state.mainButton.disabled}
                  onPress={this.playPause}
                />
                <TouchableIcon
                  name="stop"
                  size={40}
                  disabled={this.state.stopButton.disabled}
                  onPress={this.stop}
                />
              </View>
              <View flex={1} alignSelf="stretch" alignItems="flex-end" justifyContent="center">
                <TouchableIcon name="close" size={30} onPress={this.close} />
              </View>
            </View>
          </View>
        </View>
      </BottomFixedPanel>
    );
  }
}

const enhance = compose(connectPlayer, withTheme);
export default enhance(Player);
