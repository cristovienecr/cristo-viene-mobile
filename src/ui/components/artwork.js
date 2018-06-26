import React from 'react';
import styled from 'glamorous-native';
import { defaultProps } from 'recompose';
import { isNotNullOrEmpty } from '../../helpers/check';
import artwork from '../assets/images/default-artwork.png';

const ArtworkImage = styled.image(({ size }) => ({ height: size, width: size }));
const Artwork = ({ uri, ...props }) => (
  <ArtworkImage source={isNotNullOrEmpty(uri) ? { uri } : artwork} {...props} />
);
const enhance = defaultProps({ resizeMethod: 'resize', resizeMode: 'contain' });

export default enhance(Artwork);
