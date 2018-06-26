import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors } from '../redux';

const { getNetworkStatus } = Selectors;
const mapStateToProps = createStructuredSelector({
  isNetworkConnected: getNetworkStatus,
});

export default connect(mapStateToProps);
