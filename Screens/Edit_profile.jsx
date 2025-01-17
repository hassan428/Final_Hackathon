import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {SomeText} from '../component/Text_component';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {Custom_input} from '../component/Custom_input';
import {validateEmail} from '../utils/validate_email';
import {api_update_profile} from '../config/Apis';
import {islogged_action, profile_action} from '../store/slices/auth_slice';
import {Alert_dialog} from '../component/Alert_dialog';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_NAME} from '@env';
export const Edit_profile = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {profile} = useSelector(store => store.auth);
  const {username, full_name, email, phone_number, _id, avatar_url} = profile;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState({});
  const [data, setData] = useState({...profile});
  const [showAlert, setShowAlert] = useState(false);
  const [alert_data, set_alert_data] = useState({});

  const inputValue = (text, id) => {
    setErrorMsg({[id]: ''});

    if (id !== 'full_name') text = text.split(' ').join('');
    setData({...data, [id]: text});
  };

  const submit_handle = async () => {
    try {
      if (!validateEmail(data.email)) {
        setErrorMsg({email: 'Please enter a valid email address'});
      }

      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== profile[key]) {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      if (Object.keys(filteredData).length > 0) {
        const res = await api_update_profile({...filteredData, _id});
        // console.log('res', res.data.data);
        dispatch(profile_action(res.data.data));
        navigation.navigate('Home');
      } else {
        navigation.navigate('Home');
      }
    } catch (err) {
      set_alert_data({showAlert: false});
      console.log('err', err.response.data);
      if (err.response.data) {
        const {message, success} = err.response.data;
        if (message.includes('duplicate')) {
          if (message.includes('username:')) {
            setErrorMsg({username: 'Username already exists!'});
          } else if (message.includes('phone_number:')) {
            setErrorMsg({phone_number: 'Phone Number already exists!'});
          }
        } else {
          setErrorMsg({other: message});
        }
      } else {
        setErrorMsg({other: err.message});
      }
    }
  };

  const logout_handle = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_NAME);
      dispatch(islogged_action(false));
      navigation.navigate('LogIn');
    } catch (error) {
      set_alert_data({showAlert: false});
    }
  };

  const show_alert_handle = value => {
    if (value == 'LogOut') {
      set_alert_data({
        title: 'LogOut',
        text: 'Are you sure you want to logOut?',
        btn_one: 'Yes, LogOut',
        btn_one_handle: logout_handle,
        btn_two: 'No, Stayed',
        btn_two_handle: () => set_alert_data({showAlert: false}),
        showAlert: true,
      });
    } else {
      set_alert_data({
        title: 'Update Profile',
        text: 'Do you want to update your profile?',
        btn_one: 'Yes, Update',
        btn_one_handle: submit_handle,
        btn_two: 'No',
        btn_two_handle: () => set_alert_data({showAlert: false}),
        showAlert: true,
      });
    }
  };

  const render_input_field = [
    {
      name: 'Full Name',
      id: 'full_name',
      defaultValue: full_name,
      value: data.full_name,
      error: errorMsg.full_name,
      keyboardType: 'default',
    },
    // {
    //   name: 'Email',
    //   id: 'email',
    //   defaultValue: email,
    //   value: data.email,
    //   error: errorMsg.email,
    //   keyboardType: 'email-address',
    //   disabled: true,
    // },
    {
      name: 'Username',
      id: 'username',
      defaultValue: username,
      value: data.username,
      error: errorMsg.username,
      keyboardType: 'default',
    },
    {
      name: 'Phone Number',
      id: 'phone_number',
      defaultValue: phone_number,
      value: data.phone_number,
      error: errorMsg.phone_number,
      keyboardType: 'number-pad',
    },
  ];

  const {
    container,
    center,
    some_text,
    err_msg,
    edit_btn,
    border_style,
    inputs_container,
  } = styles;
  return (
    <>
      <AppBar
        title={`Edit Profile`}
        leftIcon={'chevron-left'}
        rightText={'Save'}
        leftIconHandle={() => navigation.goBack()}
        rightIconHandle={() => show_alert_handle('update')}
      />
      <Alert_dialog
        {...alert_data}
        hideDialog={() => set_alert_data({showAlert: false})}
      />
      <ScrollView style={{backgroundColor}} contentContainerStyle={[container]}>
        <View style={[center]}>
          <View style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
            <Avatar.Image
              size={100}
              source={{
                uri: avatar_url,
              }}
            />
          </View>
        </View>

        {errorMsg.other && <SomeText myStyle={err_msg} text={errorMsg.other} />}

        <View style={{gap: 10}}>
          {render_input_field.map(
            (
              {id, name, defaultValue, keyboardType, value, error, disabled},
              i,
            ) => (
              <View key={i} style={[inputs_container]}>
                <SomeText text={name} myStyle={{...some_text, marginTop: 15}} />
                <View style={[border_style, {borderColor: color}]}>
                  <Custom_input
                    placeholder={'Task Name'}
                    defaultValue={defaultValue}
                    value={value}
                    keyboardType={keyboardType}
                    disabled={disabled}
                    error={error && true}
                    onChangeText={text => inputValue(text, id)}
                  />
                </View>
                {error && <SomeText myStyle={err_msg} text={error} />}
              </View>
            ),
          )}
        </View>
        <View style={[edit_btn, {borderColor: primary}]}>
          <ActiveBtn
            text="Change Password"
            onPress={() => navigation.navigate('NewPassword')}
          />
        </View>
        <Submit_btn
          text={'LogOut'}
          onPress={() => show_alert_handle('LogOut')}
          myStyle={{marginVertical: 10}}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit_btn: {
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,
  },
  border_style: {
    borderWidth: 1,
    borderRadius: 15,
  },
  inputs_container: {
    gap: 10,
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
  },
});
