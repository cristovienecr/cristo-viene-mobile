import React from 'react';
import { compose, equals } from 'ramda';
import { RefreshControl, ListView } from 'react-native';
import styled, { withTheme } from 'glamorous-native';
import { Container, Content } from 'native-base';
import { connectAudioCatalog } from '../../connectors';
import PlaylistCard from './playlist-card';
import CatalogHeader from './catalog-header';
import NoAudiosMessage from '../no-audios-message';
import { NoNetworkMessage, connectNetworkStatus } from '../../../network';

const CatalogBackground = styled(Container)((_, theme) => ({
  backgroundColor: theme.colors.palette.gray.one,
  paddingBottom: 10,
}));

const hasPlaylistChanged = (left, right) => left !== right;
const AsCard = playlist => (
  <PlaylistCard key={playlist.id} playlist={playlist} />
);
const renderContent = (playlists, refreshing, refresh) => {
  if (!refreshing && playlists.getRowCount() === 0) {
    return <NoAudiosMessage retry={refresh} />;
  }

  return (
    <ListView dataSource={playlists} renderRow={AsCard} enableEmptySections />
  );
};

class AudioCatalog extends React.Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: hasPlaylistChanged,
    });
    this.state = {
      refreshing: props.isCatalogLoading,
      datasource: ds.cloneWithRows(props.playlists || []),
    };
    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isCatalogLoading !== this.state.refreshing) {
      this.setState({ refreshing: props.isCatalogLoading });
    }

    if (props.playlists !== this.props.playlists) {
      this.setState({
        datasource: this.state.datasource.cloneWithRows(props.playlists),
      });
    }
  }

  shouldComponentUpdate(props, state) {
    return (
      !equals(this.props.playlists, props.playlists) ||
      !equals(this.state.refreshing, state.refreshing)
    );
  }

  refresh() {
    const { isNetworkConnected } = this.props;
    if (!isNetworkConnected) return;
    this.props.loadCatalog();
    this.setState({ refreshing: true });
  }

  render() {
    return (
      <CatalogBackground>
        <CatalogHeader />
        <NoNetworkMessage />
        <Content
          style={{ padding: 5 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
        >
          {renderContent(
            this.state.datasource,
            this.state.refreshing,
            this.refresh
          )}
        </Content>
      </CatalogBackground>
    );
  }
}

const connect = compose(connectNetworkStatus, connectAudioCatalog, withTheme);
export default connect(AudioCatalog);
