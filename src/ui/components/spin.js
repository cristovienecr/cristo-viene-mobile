import React from 'react';
import * as Animatable from 'react-native-animatable';

const Spin = props => (
  <Animatable.View
    duration={1000}
    easing="linear"
    style={{ backgroundColor: 'transparent' }}
    {...props}
    animation="rotate"
    iterationCount="infinite"
  />
);

export default Spin;
