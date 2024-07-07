import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'arial',
  },
  input: {
    width: '85%',
    padding: 0,
    fontSize: 15,
  },
  input_view: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
    gap: 5,
  },
});
const { fontFamily, input_view, input } = styles;

const Custom_input = props => {
  return (
    <TextInput
      mode="outlined"
      theme={{
        roundness: 15, // This sets the roundness of the TextInput
        colors: {
          primary: 'blue', // You can customize the primary color if needed
        },
      }}
      contentStyle={{ ...fontFamily, fontWeight: 'bold' }}
      right={<TextInput.Icon icon={props.icon} />}
      {...props}
    />
  );
};

const Password_input = props => {
  const [visibility, setVisibility] = useState(true);
  const toggle = () => setVisibility(pre => !pre);

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={visibility}
      theme={{
        roundness: 15, // This sets the roundness of the TextInput
        colors: {
          primary: 'blue', // You can customize the primary color if needed
        },
      }}
      placeholder={'Enter your password'}
      contentStyle={{ ...fontFamily, fontWeight: 'bold' }}
      {...props}
      right={
        visibility ? (
          <TextInput.Icon icon="eye" onPress={toggle} />
        ) : (
          <TextInput.Icon icon="eye-off" onPress={toggle} />
        )
      }
    />
  );
};

export { Custom_input, Password_input };
