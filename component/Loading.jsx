import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';

import {useSelector} from 'react-redux';

export const Loading = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <ActivityIndicator
      size={45}
      color={primary}
      style={{flex: 1, backgroundColor}}
    />
  );
};
