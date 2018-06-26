import React, { Component } from 'react';
import configure from './configure';
import App from './app';

const ConfiguredApp = configure(App);

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends Component {
  render() {
    return <ConfiguredApp {...this.props} />;
  }
}
/* eslint-enable react/prefer-stateless-function */

export default Root;
