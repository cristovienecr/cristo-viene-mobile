import { compose, curry } from 'ramda';
import { getTheme } from 'native-base';
import NativeBaseVariables from 'native-base/src/theme/variables/material';
import { isNotNullOrEmpty } from '../../helpers/check';

// The assignment to NativeBase variables must be done
// through property assignment, without the merge function
/* eslint-disable no-param-reassign */
const applyThemeTo = curry((base, theme) => {
  if (isNotNullOrEmpty(theme.colors.primary)) {
    base.brandPrimary = theme.colors.primary;
    base.toolbarDefaultBg = theme.colors.primary;
  }
  if (isNotNullOrEmpty(theme.colors.info)) base.brandInfo = theme.colors.info;
  if (isNotNullOrEmpty(theme.colors.success)) base.brandSuccess = theme.colors.success;
  if (isNotNullOrEmpty(theme.colors.danger)) base.brandDanger = theme.colors.danger;
  if (isNotNullOrEmpty(theme.colors.warning)) base.brandWarning = theme.colors.warning;
  if (isNotNullOrEmpty(theme.text.color)) base.textColor = theme.text.color;
  if (isNotNullOrEmpty(theme.text.contrast)) base.inverseTextColor = theme.text.contrast;
  return base;
});
/* eslint-enable no-param-reassign */

const asProps = style => ({ style });
export default compose(asProps, getTheme, applyThemeTo(NativeBaseVariables));
