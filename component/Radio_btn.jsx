import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';

import {SomeText} from './Text_component';

export const Radio_btn = ({
  value,
  onValueChange,
  primary,
  color,
  radio_data,
}) => {
  const {container, alignItems} = styles;
  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <View style={[container]}>
        {radio_data?.map(({text}, i) => (
          <View style={[alignItems]} key={i}>
            <SomeText text={text} />
            <RadioButton color={primary} uncheckedColor={color} value={text} />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 25,
  },
  alignItems: {
    alignItems: 'center',
  },
});
