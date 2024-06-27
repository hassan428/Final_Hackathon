import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: '900',
  },
  fontFamily: {
    fontFamily: 'arial',
  },
  heading_text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const {heading, fontFamily, heading_text} = styles;

const Heading = ({myStyle, text}) => {
  return <Text style={[heading, fontFamily, {...myStyle}]}>{text}</Text>;
};

const HeadingText = ({myStyle, text}) => {
  return <Text style={[heading_text, fontFamily, {...myStyle}]}>{text}</Text>;
};

const SomeText = props => {
  return (
    <Text
      style={[fontFamily, {textAlign: 'center', ...props.myStyle}]}
      {...props}>
      {props.text}
    </Text>
  );
};

export {Heading, HeadingText, SomeText};
