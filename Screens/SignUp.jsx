import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {Password_input} from '../component/Custom_input';
import {useNavigation} from '@react-navigation/native';
// import {getErrorMessage} from '../utils/firebaseErrorMsg';
import {TextInput} from 'react-native-paper';

export const SignUp = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();

  const submit_handle = () => {
    const values = Object.values(data);
    const isEmpty = values.some(
      value => value === '' || value === null || value === undefined,
    );
    if (isEmpty || values.length < 3) {
      setErrorMsg('Please fill all the fields');
    } else {
      setErrorMsg('');
    }
  };
  console.log(data);

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({...data, [id]: text});
  };

  const {
    scroll_view,
    heading_view,
    err_msg,
    forget_password,
    input_view,
    navigate_view,
  } = styles;
  return (
    <ScrollView style={[scroll_view]}>
      <View style={[heading_view]}>
        <Heading text="Sign Up" />

        <HeadingText text="Please Sign Up" />
      </View>

      <View style={[input_view]}>
        <View>
          <TextInput
            mode="outlined"
            error={errorMsg.Username && true}
            label="Username"
            keyboardType="ascii-capable"
            right={<TextInput.Icon icon="email" />}
            value={data.Username}
            onChangeText={text => inputValue(text, 'Username')}
          />
          {errorMsg.Username && (
            <SomeText myStyle={err_msg} text={errorMsg.Username} />
          )}
        </View>
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

      <Submit_btn onPress={submit_handle} text={'Sign Up'} />

      <View style={[navigate_view]}>
        <SomeText text={'Already have an account? '} />
        <SomeText
          myStyle={{color: '#0059FF'}}
          text={'Log In'}
          onPress={() => navigation.navigate('LogIn')}
        />
      </View>
    </ScrollView>
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
