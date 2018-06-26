import { compose, map, equals } from 'ramda';
import React from 'react';
import time from 'date-fns/format';
import { RefreshControl } from 'react-native';
import { List, ListItem, Body, Text, Container, Content } from 'native-base';
import { playlistDetailsLifecycle } from '../../hoc';
import { connectPlaylistDetails } from '../../connectors';
import PlaylistDetailsHeader from './playlist-details-header';
import PlaylistDescription from './playlist-description';
import { PlayTrackButton } from '../../../player';
import NoAudiosMessage from '../no-audios-message';
import { isNullOrEmpty } from '../../../helpers/check';
import { NoNetworkMessage, connectNetworkStatus } from '../../../network';

const renderTrackItem = track => (
  <ListItem key={track.id}>
    <Body>
      <Text>{track.title}</Text>
      <Text note>{time(track.duration, 'mm:ss')}</Text>
    </Body>
    <PlayTrackButton size={30} trackId={track.id} />
  </ListItem>
);

const renderContent = (tracks, refreshing, refresh) => {
  if (!refreshing && isNullOrEmpty(tracks)) return <NoAudiosMessage retry={refresh} />;
  return <List style={{ paddingTop: 15 }}>{map(renderTrackItem, tracks || [])}</List>;
};

class PlaylistDetails extends React.Component {
  constructor(props) {
    super();
    this.state = { refreshing: props.isPlaylistLoading };
    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isPlaylistLoading === this.state.refreshing) return;
    this.setState({ refreshing: props.isPlaylistLoading });
  }

  shouldComponentUpdate(props, state) {
    return !equals(this.props.playlist, props.playlist) || !equals(this.state, state);
  }

  refresh() {
    const { openPlaylist, playlist, isNetworkConnected } = this.props;
    if (!isNetworkConnected) return;
    openPlaylist(playlist.id);
    this.setState({ refreshing: true });
  }

  render() {
    const { playlist } = this.props;
    return (
      <Container>
        <PlaylistDetailsHeader title={playlist.title} artwork={playlist.artworkUrl} />
        <NoNetworkMessage />
        <Content
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />
          }
        >
          <PlaylistDescription playlist={playlist} />
          {renderContent(playlist.tracks || [], this.state.refreshing, this.refresh)}
        </Content>
      </Container>
    );
  }
}

const connect = compose(connectPlaylistDetails, connectNetworkStatus, playlistDetailsLifecycle);
export default connect(PlaylistDetails);
