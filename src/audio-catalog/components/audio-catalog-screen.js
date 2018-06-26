import React from 'react';
import { equals } from 'ramda';
import { Route, Switch } from 'react-router-native';
import Catalog from './catalog';
import PlaylistDetails from './playlist-details';

class AudioCatalogScreen extends React.Component {
  shouldComponentUpdate(props) {
    return !equals(this.props, props);
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/:id`} component={PlaylistDetails} />
        <Route path={match.url} component={Catalog} exact />
      </Switch>
    );
  }
}

export default AudioCatalogScreen;
