import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';

import { connectStyle } from 'native-base';
import mapPropsToStyleNames from 'native-base/dist/src/Utils/mapPropsToStyleNames';

// Component taken from native-base. We need to a touchable card item without feedback.
// Unfortunately this is impossible with the current card item component in native base.

/* eslint-disable no-underscore-dangle */
class CardItemWithoutFeedback extends Component {
  render() {
    if (this.props.button) {
      return (
        <TouchableWithoutFeedback
          ref={(c) => {
            this._root = c;
          }}
          {...this.props}
        >
          {this.props.children}
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View
        ref={(c) => {
          this._root = c;
        }}
        {...this.props}
      >
        {this.props.children}
      </View>
    );
  }
}
/* eslint-enable no-underscore-dangle */

/* eslint-disable react/require-default-props */
CardItemWithoutFeedback.propTypes = {
  ...TouchableWithoutFeedback.propTypes,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  header: PropTypes.bool,
  cardBody: PropTypes.bool,
  footer: PropTypes.bool,
  button: PropTypes.bool,
};
/* eslint-enable react/require-default-props */

const enhance = connectStyle('NativeBase.CardItem', {}, mapPropsToStyleNames);

export default enhance(CardItemWithoutFeedback);
