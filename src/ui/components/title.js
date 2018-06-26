import { defaultProps } from 'recompose';
import styled from 'glamorous-native';

const Title = styled.text({ fontWeight: '700' }, (_, theme) => ({ color: theme.text.color }));
const enhance = defaultProps({ numberOfLines: 1, ellipsizeMode: 'tail' });

export default enhance(Title);
