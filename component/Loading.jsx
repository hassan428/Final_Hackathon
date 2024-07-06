import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';

export const Loading = () => (
  <ActivityIndicator
    animating={true}
    size={40}
    color={'#fec549'}
    style={{flex: 1}}
  />
);
