import { T, assoc, path } from 'ramda';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'glamorous-native';
import { Dimensions, PanResponder, DeviceEventEmitter } from 'react-native';
import { resolveDimensionsEvent } from '../../helpers/environment';

const DEFAULT_HEADER_HEIGHT = 40;
const DEFAULT_TOP_MARGIN = 25;

const PanelHeader = styled.view({
  borderWidth: 0,
  justifyContent: 'center',
  alignSelf: 'stretch',
});

const Panel = styled.view({
  borderWidth: 0,
  bottom: 0,
  position: 'absolute',
});

const createInitialState = (props) => {
  const { topMargin } = props;
  const { height, width } = Dimensions.get('window');
  return {
    width,
    height: DEFAULT_HEADER_HEIGHT,
    maxHeight: height - topMargin,
    minHeight: DEFAULT_HEADER_HEIGHT,
  };
};

class SlidingUpPanel extends Component {
  static propTypes = {
    Header: PropTypes.node.isRequired,
    topMargin: PropTypes.number,
  };

  static defaultProps = {
    topMargin: DEFAULT_TOP_MARGIN,
  };

  constructor(props) {
    super(props);
    this.pan = {};
    this.top = -DEFAULT_HEADER_HEIGHT;
    this.state = createInitialState(props);
    this.handleDimensionsChange = ::this.handleDimensionsChange;
    this.handlePanResponderStart = ::this.handlePanResponderStart;
    this.handlePanResponderEnd = ::this.handlePanResponderEnd;
    this.handlePanResponderMove = ::this.handlePanResponderMove;
    this.resolveHeaderHeight = ::this.resolveHeaderHeight;
  }

  componentWillMount() {
    this.pan = PanResponder.create({
      onStartShouldSetPanResponder: T,
      onMoveShouldSetPanResponder: T,
      onPanResponderStart: this.handlePanResponderStart,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('didUpdateDimensions', this.handleDimensionsChange);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('didUpdateDimensions', this.handleDimensionsChange);
  }

  handleDimensionsChange(dimensions) {
    const { height, width } = resolveDimensionsEvent(dimensions);
    const { topMargin } = this.props;
    const maxHeight = height - topMargin;
    const current = this.isClose() ? this.state.minHeight : maxHeight;
    this.setState(state => ({ ...state, height: current, width, maxHeight }));
  }

  handlePanResponderStart(event, { dy }) {
    const { height } = this.state;
    this.top = -dy - height;
  }

  handlePanResponderMove(event, { dy }) {
    const height = -dy - this.top;
    this.setState(assoc('height', height));
  }

  handlePanResponderEnd(event, { dy }) {
    if (dy < 0) {
      this.top += dy;
      this.open();
      return;
    }

    const { minHeight } = this.state;
    this.top = -minHeight;
    this.close();
  }

  open() {
    const { maxHeight } = this.state;
    this.setState(assoc('height', maxHeight));
  }

  close() {
    const { minHeight } = this.state;
    this.setState(assoc('height', minHeight));
  }

  toggle() {
    if (this.isClose()) this.open();
    else this.close();
  }

  resolveHeaderHeight(event) {
    const headerHeight = path(['nativeEvent', 'layout', 'height'], event);
    const isClose = this.isClose();
    if (isClose) this.top = -headerHeight;
    this.setState((state) => {
      if (isClose) return { ...state, minHeight: headerHeight, height: headerHeight };
      return { ...state, minHeight: headerHeight };
    });
  }

  isOpen() {
    return !this.isClose();
  }

  isClose() {
    const { height, minHeight } = this.state;
    return height === minHeight;
  }

  render() {
    const { panHandlers } = this.pan;
    const { Header, children } = this.props;
    const { height, width } = this.state;
    return (
      <Panel style={{ height, width }}>
        <PanelHeader onLayout={this.resolveHeaderHeight} {...panHandlers}>
          {Header}
        </PanelHeader>
        {children}
      </Panel>
    );
  }
}

export default SlidingUpPanel;
