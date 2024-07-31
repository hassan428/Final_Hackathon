import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

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
  },
  text_style: {
    marginLeft: 20,
    fontSize: 15,
  },
});

const {heading, fontFamily, heading_text, text_style, title_style} = styles;

const Heading = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <Text style={[heading, fontFamily, {color, ...props.myStyle}]} {...props}>
      {props.text}
    </Text>
  );
};

const HeadingText = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <Text
      style={[heading_text, fontFamily, {color, ...props.myStyle}]}
      {...props}>
      {props.text}
    </Text>
  );
};

const SomeText = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <Text style={[fontFamily, {color, ...props.myStyle}]} {...props}>
      {props.text}
    </Text>
  );
};

const Start_screen_title = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  return (
    <Text style={[title_style, fontFamily, {color}]} {...props}>
      {props.firstText} <Text style={{color: primary}}>{props.colorText}</Text>{' '}
      {props.lastText}
    </Text>
  );
};

const Start_screen_text = props => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  return (
    <Text style={[fontFamily, text_style, {color: primary}]} {...props}>
      {props.text}
    </Text>
  );
};

export {Heading, HeadingText, SomeText, Start_screen_title, Start_screen_text};
