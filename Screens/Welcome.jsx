import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Heading, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {useNavigation} from '@react-navigation/native';

export const Welcome = () => {
  const navigation = useNavigation();

  const {container, button_view, text_view} = styles;
  return (
    <View style={[container]}>
      <View style={[text_view]}>
        <Heading text="Welcome to [name]" />
        <SomeText text="Please log in to continue or sign up to create a new account." />
      </View>

      <View style={[button_view]}>
        <Submit_btn
          onPress={() => navigation.navigate('LogIn')}
          text={'Log in'}
        />
        <Submit_btn
          onPress={() => navigation.navigate('SignUp')}
          text={'Sign Up'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    // paddingTop: 40,
  },
  text_view: {
    width: '90%',
    gap: 10,
  },
  button_view: {
    flexDirection: 'row',
    gap: 40,
  },
});
