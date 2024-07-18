import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {primary} from '../config/themeConfig';

const styles = StyleSheet.create({
  active_btn: {
    color: '#00A3FF',
    borderBottomWidth: 2,
    borderBottomColor: '#00A3FF',
    padding: 5,
    fontSize: 15,
  },
  inActive_btn: {
    color: 'gray',
    padding: 5,
    fontSize: 15,
  },
  fontFamily: {
    fontFamily: 'arial',
  },
  submit_btn: {
    width: '100%',
    padding: 10,
    margin: 10,
    backgroundColor: '#00A3FF',
    borderRadius: 10,
  },
  submit_btn_text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
const {fontFamily, inActive_btn} = styles;

const ActiveBtn = props => {
  return (
    <Button
      mode="text"
      labelStyle={[{color: 'black', textAlign: 'left'}, fontFamily]}
      {...props}>
      {props.text}
    </Button>
  );
};

const InActiveBtn = ({myStyle, text, navigation}) => {
  return (
    <TouchableOpacity
      style={{borderWidth: 0}}
      onPress={() => navigation.navigate(text)}>
      <Text style={[fontFamily, inActive_btn, {...myStyle}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const Submit_btn = props => {
  return (
    <Button
      labelStyle={[{fontSize: 15, color: 'white'}, fontFamily]}
      mode="elevated"
      elevation={5}
      style={{
        width: '100%',
        borderRadius: 10,
        padding: 3,
        backgroundColor: primary,
        ...props.myStyle,
      }}
      {...props}>
      {props.text}
    </Button>
  );
};

export {ActiveBtn, InActiveBtn, Submit_btn};
