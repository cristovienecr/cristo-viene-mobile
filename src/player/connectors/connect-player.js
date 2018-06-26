import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors, Actions } from '../redux';

const { getPlayingTrack } = Selectors;
const { closePlayer } = Actions;

const mapStateToProps = createStructuredSelector({
  track: getPlayingTrack,
});

export default connect(mapStateToProps, { closePlayer });
