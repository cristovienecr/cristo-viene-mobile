import { connect } from 'react-redux';
import { Actions } from '../redux';

const { changeDimensions } = Actions;
const mapDispatchToProps = {
  onDimensionsChange: changeDimensions,
};

export default connect(undefined, mapDispatchToProps);
