import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';

export const Create_team = () => {
  const navigation = useNavigation();
  return (
    <>
      <AppBar
        title={`Create Team`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        leftIconHandle={() => navigation.goBack()}
      />
    </>
  );
};
const styles = StyleSheet.create({});
