import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'arial',
    fontWeight: 'bold',
  },
});
const {fontFamily} = styles;

const Custom_input = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  return (
    <TextInput
      mode="outlined"
      theme={{
        roundness: 15, // This sets the roundness of the TextInput
        colors: {
          primary, // You can customize the primary color if needed
        },
      }}
      placeholderTextColor={color}
      contentStyle={[fontFamily]}
      right={props.icon && <TextInput.Icon icon={props.icon} color={color} />}
      {...props}
      style={{backgroundColor, color, ...props.style}}
    />
  );
};

const Password_input = props => {
  const [visibility, setVisibility] = useState(true);
  const toggle = () => setVisibility(pre => !pre);
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <TextInput
      mode="outlined"
      secureTextEntry={visibility}
      theme={{
        roundness: 15, // This sets the roundness of the TextInput
        colors: {
          primary, // You can customize the primary color if needed
        },
      }}
      placeholder={'Enter your password'}
      placeholderTextColor={color}
      contentStyle={[fontFamily]}
      {...props}
      style={{backgroundColor, color, ...props.style}}
      right={
        visibility ? (
          <TextInput.Icon icon="eye" color={color} onPress={toggle} />
        ) : (
          <TextInput.Icon icon="eye-off" color={color} onPress={toggle} />
        )
      }
    />
  );
};

export {Custom_input, Password_input};
