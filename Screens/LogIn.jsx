import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {Password_input} from '../component/Custom_input';
import {useNavigation} from '@react-navigation/native';
// import {
//   getErrorEmailMessage,
//   getErrorPasswordMessage,
// } from '../utils/firebaseErrorMsg';
import {TextInput} from 'react-native-paper';

export const LogIn = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  console.log('errorMsg', errorMsg);
  const navigation = useNavigation();

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({...data, [id]: text});
  };

  const submit_handle = () => {
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
  // console.log(data);
  const {
    heading_view,
    scroll_view,
    input_view,
    forget_password,
    navigate_view,
    err_msg,
  } = styles;

  return (
    <>
      <ScrollView style={[scroll_view]}>
        <View style={[heading_view]}>
          <Heading text="Log In" />

          <HeadingText text="Please Log in" />
        </View>

        <View style={[input_view]}>
          <View>
            <TextInput
              mode="outlined"
              error={errorMsg.email && true}
              label="email"
              keyboardType="email-address"
              right={<TextInput.Icon icon="email" />}
              value={data.email}
              onChangeText={text => inputValue(text, 'email')}
            />
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

            <SomeText myStyle={forget_password} text={'Forget Password?'} />
          </View>
        </View>

        <Submit_btn onPress={submit_handle} text={'Log In'} />

        <SomeText myStyle={{fontSize: 20}} text={'or'} />

        <Submit_btn
          onPress={submit_handle}
          text={'Log in with Google'}
          icon={'google'}
          textColor="black"
          buttonColor="#E3E0E0"
          mode="outlined"
        />
        <Submit_btn
          onPress={submit_handle}
          text={'Log in with Github'}
          icon={'github'}
          textColor="black"
          buttonColor="#E3E0E0"
          mode="outlined"
        />

        <View style={[navigate_view]}>
          <SomeText text={"Don't have an account? "} />
          <SomeText
            myStyle={{color: '#0059FF'}}
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
  },
  heading_view: {},
  input_view: {},
  err_msg: {},
  forget_password: {},
  navigate_view: {},
});
