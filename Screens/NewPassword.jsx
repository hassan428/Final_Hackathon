import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {Password_input} from '../component/Custom_input';
import {useNavigation} from '@react-navigation/native';
import {AppBar} from '../component/AppBar';
import {api_login} from '../config/Apis';
import {useSelector} from 'react-redux';

export const NewPassword = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  const [btn_loading, set_btn_loading] = useState(false);
  const navigation = useNavigation();
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );
  const inputValue = (text, id) => {
    text = text.split(' ').join('');
    setData({...data, [id]: text});
  };

  const submit_handle = async () => {
    try {
      const values = Object.values(data);
      const isEmpty = values.some(
        value => value === '' || value === null || value === undefined,
      );
      if (isEmpty || values.length < 3) {
        setErrorMsg({other: 'Please fill all the fields'});
      } else {
        setErrorMsg('');
        set_btn_loading(true);
        const res = await api_login(data);
        console.log('res', res.data);
      }
    } catch (err) {
      set_btn_loading(false);
      const {message, success} = err.response.data;
      if (message.includes('password')) {
        setErrorMsg({password: message});
      }
      console.log(message);
      // setErrorMsg({other: message});
    }
  };

  // console.log('data', data)

  // console.log(data);
  const {heading_view, scroll_view, input_view, err_msg, text_style} = styles;

  return (
    <>
      <AppBar
        title={'Change Password'}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <ScrollView style={[scroll_view, {backgroundColor}]}>
        <View style={[heading_view]}>
          <Heading text="Change Password" />

          <SomeText
            myStyle={text_style}
            text="Please enter your new password to update your account."
          />
        </View>

        <View style={[input_view]}>
          <View>
            <Password_input
              onChangeText={text => inputValue(text, 'old_password')}
              value={data.old_password}
              error={errorMsg.old_password && true}
              placeholder={'Enter Old Password'}
            />
            {errorMsg.old_password && (
              <SomeText myStyle={err_msg} text={errorMsg.old_password} />
            )}
          </View>
          <View>
            <Password_input
              onChangeText={text => inputValue(text, 'new_password')}
              value={data.new_password}
              error={errorMsg.new_password && true}
              placeholder={'Enter New Password'}
            />
            {errorMsg.new_password && (
              <SomeText myStyle={err_msg} text={errorMsg.new_password} />
            )}
          </View>
          <View>
            <Password_input
              onChangeText={text => inputValue(text, 'confirm_password')}
              value={data.confirm_password}
              error={errorMsg.confirm_password && true}
              placeholder={'Enter Confirm Password'}
            />
            {errorMsg.confirm_password && (
              <SomeText myStyle={err_msg} text={errorMsg.confirm_password} />
            )}
          </View>
        </View>

        <SomeText
          myStyle={{...err_msg, textAlign: 'center', marginBottom: 5}}
          text={errorMsg.other}
        />
        <Submit_btn
          loading={btn_loading}
          disabled={btn_loading}
          onPress={submit_handle}
          text={'Set Password'}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    padding: 20,
  },
  heading_view: {
    gap: 10,
    width: '90%',
  },
  input_view: {
    marginVertical: 25,
    gap: 30,
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
  },
  text_style: {
    fontSize: 15,
    color: '#8D8D8D',
  },
});
