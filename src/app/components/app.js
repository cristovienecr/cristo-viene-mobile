import React from 'react';
import styled, { View } from 'glamorous-native';
import { NativeRouter, Route, Switch, Redirect } from 'react-router-native';
import { AudioCatalogScreen } from '../../audio-catalog';
import { Player, playerAware } from '../../player';

const PlayerAwareView = playerAware(styled.view({ flex: 1 }));
const App = () => (
  <View flex={1}>
    <PlayerAwareView>
      <NativeRouter>
        <Switch>
          <Redirect from="/" to="/audio-catalog" exact push />
          <Route path="/audio-catalog" component={AudioCatalogScreen} />
        </Switch>
      </NativeRouter>
    </PlayerAwareView>
    <Player />
  </View>
);

export default App;
