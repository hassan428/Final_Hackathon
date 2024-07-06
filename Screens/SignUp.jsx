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

  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({...data, [id]: text});
  };

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
    // console.log(data);
  };

  const sign_up_with_google = () => {
    console.log('sign_up_with_google');
  };

  const sign_up_with_github = () => {
    console.log('sign_up_with_github');
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
        <Heading text="Let's Sign Up" />

        <HeadingText text="Hello user, you have a greatful journey" />
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

      <Submit_btn
        onPress={sign_up_with_google}
        text={'Sign Up with Google'}
        icon={'google'}
        textColor="black"
        buttonColor="#E3E0E0"
        mode="outlined"
      />
      <Submit_btn
        onPress={sign_up_with_github}
        text={'Sign Up with Github'}
        icon={'github'}
        textColor="black"
        buttonColor="#E3E0E0"
        mode="outlined"
      />

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
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  heading_view: {
    gap: 10,
    width: '75%',
  },
  input_view: {
    marginVertical: 25,
    gap: 5,
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
  },
  forget_password: {
    textAlign: 'right',
  },
  navigate_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
