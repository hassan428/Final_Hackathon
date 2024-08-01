import {ScrollView, StyleSheet, View, TextInput} from 'react-native';
import React, {useState, useRef} from 'react';
import {Heading, SomeText} from '../component/Text_component';
import {Submit_btn} from '../component/CustomBtn';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppBar} from '../component/AppBar';
import {api_verify_otp} from '../config/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {_id_name, token_name} from '../utils/constants';
import {islogged_action, profile_action} from '../store/slices/auth_slice';
import {Loading} from '../component/Loading';

export const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [btn_loading, set_btn_loading] = useState(false);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params: email_param} = useRoute();
  const [loading, set_loading] = useState(false);
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );

  const handleChange = (text, index) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const submit_handle = async () => {
    try {
      const otpCode = otp.join('');
      if (otpCode.length < 6) {
        setErrorMsg('Please enter all 6 digits of the OTP.');
      } else {
        set_btn_loading(true);
        setErrorMsg('');
        // console.log('otpCode', otpCode);
        const _id = await AsyncStorage.getItem(_id_name);
        // console.log('_id', _id);
        const res = await api_verify_otp({
          code: otpCode,
          _id,
          email: email_param,
        });
        set_loading(true);

        await AsyncStorage.setItem(token_name, res.data.token);
        dispatch(profile_action(res.data.data));
        dispatch(islogged_action(true));
        navigation.navigate('BottomTabs');
        // console.log('res', res.data);
      }
    } catch (err) {
      set_btn_loading(false);
      const {message} = err.response.data;
      setErrorMsg(message);
    }
  };

  const {
    heading_view,
    scroll_view,
    input_view,
    otp_input,
    err_msg,
    text_style,
  } = styles;

  return loading ? (
    <Loading />
  ) : (
    <>
      <AppBar
        title={'Email Verification'}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <ScrollView style={[scroll_view, {backgroundColor}]}>
        <View style={[heading_view]}>
          <Heading text="Verify Your Email" />
          <SomeText
            myStyle={text_style}
            text="Please enter the 6-digit OTP sent to your email address"
          />
        </View>
        <View style={[input_view]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (inputs.current[index] = el)}
                style={[otp_input, {color}, errorMsg && {borderColor: 'red'}]}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>
          {errorMsg ? <SomeText myStyle={err_msg} text={errorMsg} /> : null}
        </View>
        <Submit_btn
          loading={btn_loading}
          disabled={btn_loading}
          onPress={submit_handle}
          text={'Verify OTP'}
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
    width: '75%',
  },
  input_view: {
    marginVertical: 20,
    alignItems: 'center',
  },
  otp_input: {
    borderWidth: 1,
    borderColor: '#8D8D8D',
    padding: 10,
    textAlign: 'center',
    fontSize: 25,
    width: 40,
    height: 60,
    borderRadius: 10,
    fontFamily: 'arial',
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
    marginTop: 10,
  },
  text_style: {
    fontSize: 15,
    color: '#8D8D8D',
    marginBottom: 20,
  },
});
