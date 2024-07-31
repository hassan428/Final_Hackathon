import {StyleSheet, Text} from 'react-native';
import React from 'react';

export const Logo = ({fontSize, logoColor}) => {
  const styles = StyleSheet.create({
    splash_text: {
      fontWeight: 'bold',
      // letterSpacing: 1,
      fontFamily: 'monospace',
    },
  });

  return (
    <Text style={[styles.splash_text, {fontSize, color: logoColor}]}>
      Taskcy
    </Text>
  );
};
