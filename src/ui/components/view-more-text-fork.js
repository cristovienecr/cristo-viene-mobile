// taken from https://github.com/nlt2390/react-native-view-more-text
// and modified to be compatible with React 16.
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { equals } from 'ramda';

const emptyFunc = () => {};

export default class ViewMoreText extends React.Component {
  static propTypes = {
    renderViewMore: PropTypes.func,
    renderViewLess: PropTypes.func,
    afterCollapse: PropTypes.func,
    afterExpand: PropTypes.func,
    numberOfLines: PropTypes.number.isRequired,
  };

  static defaultProps = {
    renderViewMore: undefined,
    renderViewLess: undefined,
    afterCollapse: undefined,
    afterExpand: undefined,
  };

  constructor() {
    super();
    this.onLayout = this.onLayout.bind(this);
    this.resetData = this.resetData.bind(this);
    this.setOriginalHeight = this.setOriginalHeight.bind(this);
    this.onPressMore = this.onPressMore.bind(this);
    this.onPressLess = this.onPressLess.bind(this);
    this.isTruncated = false;
    this.originalHeight = 0;
    this.shouldShowMore = false;
    this.contentHeight = 0;
    this.isInit = false;
    this.resetData();
    this.state = {
      numberOfLines: null,
      opacity: 0,
    };
  }

  componentWillReceiveProps() {
    this.resetData();

    this.setState({
      numberOfLines: null,
      opacity: 0,
    });
  }

  shouldComponentUpdate(props, state) {
    return !(equals(this.props, props) && equals(this.state, state));
  }

  componentDidUpdate() {
    if (this.state.numberOfLines === null) {
      (this.props.afterExpand || emptyFunc)();
    } else {
      (this.props.afterCollapse || emptyFunc)();
    }
  }

  onLayout(event) {
    const { height } = event.nativeEvent.layout;

    if (height === 0 || this.state.opacity === 1) return false;

    this.setOriginalHeight(height);
    this.checkTextTruncated(height);
    if (this.state.numberOfLines === this.props.numberOfLines) {
      this.setState({
        opacity: 1,
      });
    }
    return true;
  }

  onPressMore() {
    this.setState({
      numberOfLines: null,
    });
  }

  onPressLess() {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    });
  }

  setOriginalHeight(height) {
    if (this.originalHeight === 0) {
      this.originalHeight = height;

      this.setState({
        numberOfLines: this.props.numberOfLines,
      });
    }
  }

  resetData() {
    this.isTruncated = false;
    this.originalHeight = 0;
    this.shouldShowMore = false;
    this.isInit = false;
  }

  checkTextTruncated(height) {
    if (height < this.originalHeight) {
      this.shouldShowMore = true;
    }
  }

  renderViewMore() {
    return <Text onPress={this.onPressMore}>View More</Text>;
  }

  renderViewLess() {
    return <Text onPress={this.onPressLess}>View Less</Text>;
  }

  renderFooter() {
    const { numberOfLines } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
      }
      return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
    }
    return false;
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={{ opacity: this.state.opacity }}>
        <Text numberOfLines={this.state.numberOfLines}>{this.props.children}</Text>
        {this.renderFooter()}

        {this.state.numberOfLines && <View style={{ width: 1, height: 1 }} />}
      </View>
    );
  }
}
