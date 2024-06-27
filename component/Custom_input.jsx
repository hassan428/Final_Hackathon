import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

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
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
const {fontFamily, input_view, input} = styles;

const Custom_input = props => {
  return (
    <View style={[input_view, {...props.myStyle}]}>
      {props.icon}
      <TextInput
        {...props}
        style={[input, fontFamily]}
        onChangeText={text => props.inputValue(text, props.id)}
      />
    </View>
  );
};

const Password_input = props => {
  const [visibility, setVisibility] = useState(true);
  const toggle = () => setVisibility(pre => !pre);

  return (
    <TextInput
      mode="outlined"
      label="Password"
      secureTextEntry={visibility}
      right={
        visibility ? (
          <TextInput.Icon icon="eye" onPress={toggle} />
        ) : (
          <TextInput.Icon icon="eye-off" onPress={toggle} />
        )
      }
      {...props}
    />
  );
};

export {Custom_input, Password_input};
