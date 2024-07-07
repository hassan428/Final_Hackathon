import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Heading, HeadingText, SomeText } from '../component/Text_component';
import { Submit_btn } from '../component/CustomBtn';
import { Custom_input, Password_input } from '../component/Custom_input';
import { useNavigation } from '@react-navigation/native';
// import {
//   getErrorEmailMessage,
//   getErrorPasswordMessage,
// } from '../utils/firebaseErrorMsg';
import { IconButton, TextInput } from 'react-native-paper';
import { AppBar } from '../component/AppBar';

export const LogIn = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  // console.log('errorMsg', errorMsg);
  const navigation = useNavigation();

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({ ...data, [id]: text });
  };

  const submit_handle = () => {
    navigation.navigate('BottomTabs');
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 2) {
      setErrorMsg('Please fill all the fields');
    } else {
      setErrorMsg('');
    }
  };

  // console.log('data', data)
  const log_in_with_google = () => {
    console.log('log_in_with_google');
  };

  const log_in_with_github = () => {
    console.log('log_in_with_github');
  };

  const forget_password_handle = () => {
    console.log('forget_password_handle');
  };
  // console.log(data);
  const {
    heading_view,
    scroll_view,
    input_view,
    forget_password,
    navigate_view,
    err_msg,
    text_style,
  } = styles;

  return (
    <>
      <AppBar title={'Sign In'} leftIcon={'chevron-left'} leftIconHandle={() => navigation.goBack()} />
      <ScrollView style={[scroll_view]}>
        <View style={[heading_view]}>
          <Heading text="Welcome Back" />

          <SomeText myStyle={text_style} text="Please Inter your email address and password for Login" />
        </View>

        <View style={[input_view]}>

          <View>
            <Custom_input
              placeholder={"Enter your email"}
              keyboardType="email-address"
              value={data.email}
              error={errorMsg.email && true}
              onChangeText={text => inputValue(text, 'email')} />
            {errorMsg.email && (
              <SomeText myStyle={err_msg} text={errorMsg.email} />
            )}
          </View>

          <View>
            <Password_input
              onChangeText={text => inputValue(text, 'password')}
              value={data.password}
              error={errorMsg.password && true}
            />
            {errorMsg.password && (
              <SomeText myStyle={err_msg} text={errorMsg.password} />
            )}

            <SomeText onPress={forget_password_handle} myStyle={forget_password} text={'Forget Password?'} />
          </View>
        </View>

        <Submit_btn onPress={submit_handle} text={'Sign In'} />

        <SomeText text={'Signin with'} myStyle={{ textAlign: "center", marginVertical: 20 }} />


        <View style={[navigate_view]}>

          <IconButton
            icon="apple"
            // iconColor={''}
            size={30}
            onPress={log_in_with_github}
          />

          <IconButton
            icon="google"
            // iconColor={''}
            size={30}
            onPress={log_in_with_google}
          />
        </View>

        <View style={[navigate_view]}>
          <SomeText text={"Not Registrar Yet? "} />
          <SomeText
            myStyle={{ color: '#0059FF' }}
            text={'Sign Up '}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  heading_view: {
    gap: 10,
    width: '75%',
  },
  input_view: {
    marginVertical: 25,
    gap: 30,
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
  },
  forget_password: {
    marginTop: 5,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  navigate_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  text_style: {
    fontSize: 15,
    color: '#8D8D8D',
  },

});
