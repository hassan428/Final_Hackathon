import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {primary} from '../config/themeConfig';

export const Loading = () => (
  <ActivityIndicator size={45} color={primary} style={{flex: 1}} />
);
