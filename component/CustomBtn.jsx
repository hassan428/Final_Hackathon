import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

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
const {fontFamily, active_btn, inActive_btn, submit_btn, submit_btn_text} =
  styles;

const ActiveBtn = ({myStyle, text}) => {
  return (
    <TouchableOpacity style={{borderWidth: 0}}>
      <Text style={[fontFamily, active_btn, {...myStyle}]}>{text}</Text>
    </TouchableOpacity>
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
      labelStyle={{fontSize: 20}}
      mode="contained"
      style={{
        borderRadius: 10,
        marginVertical: 15,
        padding: 3,
        ...props.myStyle,
      }}
      {...props}>
      {props.text}
    </Button>
  );
};

export {ActiveBtn, InActiveBtn, Submit_btn};
