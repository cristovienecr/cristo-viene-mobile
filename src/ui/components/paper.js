import styled from 'glamorous-native';

const defaultStyle = {
  borderRadius: 2,
  backgroundColor: '#fff',
  padding: 10,
};

const Paper = styled.view(({ elevation, style }, theme) => ({
  ...defaultStyle,
  ...theme.paper,
  ...theme.elevation.resolve(elevation),
  ...style,
}));

export default Paper;
