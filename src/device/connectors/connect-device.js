import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors } from '../redux';

const { getDevice } = Selectors;
const mapStateToProps = createStructuredSelector({
  device: getDevice,
});

export default connect(mapStateToProps);
