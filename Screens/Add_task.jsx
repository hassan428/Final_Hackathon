import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';

export const Add_task = () => {
  const navigation = useNavigation();
  return (
    <>
      <AppBar
        title={`Add Task`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        leftIconHandle={() => navigation.goBack()}
      />
    </>
  );
};
const styles = StyleSheet.create({});
