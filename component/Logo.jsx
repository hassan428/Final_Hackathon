import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {primary} from '../config/themeConfig';

export const Logo = ({fontSize}) => {
  const {splash_text} = styles;

  return <Text style={[splash_text, {fontSize}]}>Taskcy</Text>;
};

const styles = StyleSheet.create({
  splash_text: {
    fontWeight: 'bold',
    // letterSpacing: 1,
    fontFamily: 'monospace',
    color: primary,
  },
});
