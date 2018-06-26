import React from 'react';
import { Link } from 'react-router-native';
import CardItemWithoutFeedback from './card-item-without-feedback';

const LinkCardItem = props => <Link component={CardItemWithoutFeedback} button {...props} />;

export default LinkCardItem;
