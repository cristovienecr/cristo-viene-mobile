import React from 'react';
import { compose, defaultTo } from 'ramda';
import styled from 'glamorous-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Selectors } from '../redux';
import { PLAYER_HEIGHT } from '../constants';

const mapStateToProps = createStructuredSelector({
  isPlayerOpen: Selectors.isPlayerOpen,
});

const connector = connect(mapStateToProps);

const Content = styled.view(({ isPlayerOpen, height }) => ({
  flex: 1,
  paddingBottom: isPlayerOpen ? defaultTo(PLAYER_HEIGHT, height) : 0,
}));

const playerAware = Component => ({ isPlayerOpen, playerHeight, ...props }) => (
  <Content isPlayerOpen={isPlayerOpen} height={playerHeight}>
    <Component {...props} />
  </Content>
);

export default compose(connector, playerAware);
