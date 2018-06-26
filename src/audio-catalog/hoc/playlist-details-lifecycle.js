import { compose } from 'ramda';
import { lifecycle } from 'recompose';
import { withRouter } from 'react-router-native';
import { isNullOrEmpty } from '../../helpers/check';

const PlaylistDetailsLifecycle = lifecycle({
  componentDidMount() {
    const { openPlaylist, match } = this.props;
    if (isNullOrEmpty(openPlaylist)) return;
    openPlaylist(match.params.id);
  },

  componentWillUnmount() {
    const { closePlaylist, match } = this.props;
    if (isNullOrEmpty(closePlaylist)) return;
    closePlaylist(match.params.id);
  },
});

export default compose(withRouter, PlaylistDetailsLifecycle);
