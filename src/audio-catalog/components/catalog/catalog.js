import React from 'react';
import { compose, map, equals } from 'ramda';
import { RefreshControl } from 'react-native';
import styled, { withTheme } from 'glamorous-native';
import { Container, Content } from 'native-base';
import { connectAudioCatalog } from '../../connectors';
import PlaylistCard from './playlist-card';
import CatalogHeader from './catalog-header';
import NoAudiosMessage from '../no-audios-message';
import { isNullOrEmpty } from '../../../helpers/check';
import { NoNetworkMessage, connectNetworkStatus } from '../../../network';

const CatalogBackground = styled(Container)((_, theme) => ({
  backgroundColor: theme.colors.palette.gray.one,
  paddingBottom: 10,
}));

const AsCard = playlist => <PlaylistCard key={playlist.id} playlist={playlist} />;
const renderContent = (playlists, refreshing, refresh) => {
  if (!refreshing && isNullOrEmpty(playlists)) return <NoAudiosMessage retry={refresh} />;
  return map(AsCard, playlists);
};

class AudioCatalog extends React.Component {
  constructor(props) {
    super();
    this.state = { refreshing: props.isCatalogLoading };
    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.isCatalogLoading === this.state.refreshing) return;
    this.setState({ refreshing: props.isCatalogLoading });
  }

  shouldComponentUpdate(props, state) {
    return !equals(this.props.playlists, props.playlists) || !equals(this.state, state);
  }

  refresh() {
    const { isNetworkConnected } = this.props;
    if (!isNetworkConnected) return;
    this.props.loadCatalog();
    this.setState({ refreshing: true });
  }

  render() {
    const { playlists } = this.props;
    return (
      <CatalogBackground>
        <CatalogHeader />
        <NoNetworkMessage />
        <Content
          style={{ padding: 5 }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />
          }
        >
          {renderContent(playlists, this.state.refreshing, this.refresh)}
        </Content>
      </CatalogBackground>
    );
  }
}

const connect = compose(connectNetworkStatus, connectAudioCatalog, withTheme);
export default connect(AudioCatalog);
