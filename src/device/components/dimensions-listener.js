import { compose } from 'ramda';
import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { connectDevice } from '../connectors';
import connectDimensionsListener from '../connectors/connect-dimensions-listener';
import { resolveDimensionsEvent } from '../../helpers/environment';

class DimensionsListener extends Component {
  static propTypes = {
    onDimensionsChange: PropTypes.func.isRequired,
    device: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleDimensionsChange = ::this.handleDimensionsChange;
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('didUpdateDimensions', this.handleDimensionsChange);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('didUpdateDimensions', this.handleDimensionsChange);
  }

  handleDimensionsChange(dimensions) {
    const { height, width } = resolveDimensionsEvent(dimensions);
    const { onDimensionsChange, device } = this.props;
    if (device.height === height && device.width === width) return;
    onDimensionsChange({ height, width });
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

const connect = compose(connectDimensionsListener, connectDevice);

export default connect(DimensionsListener);
