import React from 'react';
import { Link } from 'react-router-native';
import { ListItem } from 'native-base';

const LinkListItem = props => <Link component={ListItem} button {...props} />;

export default LinkListItem;
