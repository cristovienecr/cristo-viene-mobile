import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Selectors } from '../redux';

const { getCurrentTheme, getCurrentThemeName } = Selectors;
const mapStateToProps = createStructuredSelector({
  theme: getCurrentTheme,
  themeName: getCurrentThemeName,
});

export default connect(mapStateToProps);
