import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Heading, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {Password_input} from '../component/Custom_input';
import {useNavigation} from '@react-navigation/native';
import {AppBar} from '../component/AppBar';
import {api_login, api_set_new_password} from '../config/Apis';
import {useSelector} from 'react-redux';
import {Alert_dialog} from '../component/Alert_dialog';

export const NewPassword = () => {
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState({});
  const [btn_loading, set_btn_loading] = useState(false);
  const [res_show, set_res_show] = useState({});
  const navigation = useNavigation();
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );
  const {_id} = useSelector(store => store.auth.profile);
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
      if (isEmpty || values?.length < 2) {
        setErrorMsg({other: 'Please fill all the fields'});
      } else if (data.password !== data.confirm_password) {
        setErrorMsg({confirm_password: 'Confirm Password does not match.'});
      } else {
        setErrorMsg('');
        set_btn_loading(true);
        const res = await api_set_new_password({...data, _id});
        const {success, message} = res.data;
        set_res_show({showAlert: success, text: message});
        // console.log('res', res.data);
        set_btn_loading(false);
      }
    } catch (err) {
      set_btn_loading(false);
      const {message, success} = err.response?.data;
      // console.log('message', err.response.data);
      if (message?.includes('password')) {
        setErrorMsg({password: message});
      } else {
        setErrorMsg({other: message});
      }
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
      {res_show.showAlert && (
        <Alert_dialog
          hideDialog={() => {
            set_res_show({showAlert: false});
            navigation.goBack();
          }}
          btn_one_handle={() => {
            set_res_show({showAlert: false});
            navigation.goBack();
          }}
          showAlert={res_show.showAlert}
          title={res_show.title || 'Updated'}
          text={res_show.text}
          btn_one={'ok'}
        />
      )}
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
              onChangeText={text => inputValue(text, 'password')}
              value={data.password}
              error={errorMsg.password && true}
              placeholder={'Enter New Password'}
            />
            {errorMsg.password && (
              <SomeText myStyle={err_msg} text={errorMsg.password} />
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
          {errorMsg.other && (
            <SomeText
              myStyle={{...err_msg, textAlign: 'center'}}
              text={errorMsg.other}
            />
          )}
        </View>

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
    marginVertical: 20,
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
