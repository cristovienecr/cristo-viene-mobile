import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors, Actions } from '../redux';

const { getCurrentPlaylist, getIsPlaylistLoading } = Selectors;
const { openPlaylist, closePlaylist } = Actions;

const mapStateToProps = createStructuredSelector({
  playlist: getCurrentPlaylist,
  isPlaylistLoading: getIsPlaylistLoading,
});
const mapDispatchToProps = { openPlaylist, closePlaylist };

export default connect(mapStateToProps, mapDispatchToProps);
