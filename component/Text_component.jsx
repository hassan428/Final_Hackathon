import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {primary} from '../config/themeConfig';

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 900,
  },
  fontFamily: {
    fontFamily: 'arial',
  },
  heading_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title_style: {
    marginLeft: 20,
    fontWeight: 500,
    fontSize: 30,
    width: '70%',
    color: 'black',
  },
  text_style: {
    marginLeft: 20,
    fontSize: 15,
    color: primary,
  },
});

const {heading, fontFamily, heading_text, text_style, title_style} = styles;

const Heading = ({myStyle, text}) => {
  return (
    <Text style={[heading, fontFamily, {color: 'black', ...myStyle}]}>
      {text}
    </Text>
  );
};

const HeadingText = ({myStyle, text}) => {
  return <Text style={[heading_text, fontFamily, {...myStyle}]}>{text}</Text>;
};

const SomeText = props => {
  return (
    <Text style={[fontFamily, {...props.myStyle}]} {...props}>
      {props.text}
    </Text>
  );
};

const Start_screen_title = props => {
  return (
    <Text style={[title_style, fontFamily]} {...props}>
      {props.firstText} <Text style={{color: primary}}>{props.colorText}</Text>{' '}
      {props.lastText}
    </Text>
  );
};

const Start_screen_text = props => {
  return (
    <Text style={[fontFamily, text_style]} {...props}>
      {props.text}
    </Text>
  );
};

export {Heading, HeadingText, SomeText, Start_screen_title, Start_screen_text};
