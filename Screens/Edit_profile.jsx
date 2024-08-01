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
import {Submit_btn} from '../component/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {token_name} from '../utils/constants';

export const Edit_profile = () => {
  const {profile} = useSelector(store => store.auth);
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {username, full_name, email, phone_number, _id} = profile;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState({});
  const [data, setData] = useState({...profile});
  const [showAlert, setShowAlert] = useState(false);
  const [alert_data, set_alert_data] = useState({});

  const openGalleryHandle = async () => {
    const {assets, didCancel, errorCode, errorMessage} =
      await launchImageLibrary({
        mediaType: 'photo',
      });
    if (didCancel) {
      console.log('User did not select an image.');
    } else if (errorCode) {
      console.log('error: ', errorCode, errorMessage);
    } else {
      setData({...data, avatar_url: assets[0].uri});
    }
  };

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
        console.log('res', res.data.data);
        dispatch(profile_action(res.data.data));
        navigation.navigate('Home');
      } else {
        navigation.navigate('Home');
        console.log('No changes made');
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
      await AsyncStorage.removeItem(token_name);
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

  const {container, center, some_text, err_msg, scrollView_container} = styles;
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
      <View style={[container, {backgroundColor}]}>
        <View style={[center, {gap: 5}]}>
          {data.avatar_url ? (
            <Avatar.Image
              size={100}
              source={{
                uri: data.avatar_url,
              }}
            />
          ) : (
            <Avatar.Image
              size={100}
              source={{
                uri: 'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
              }}
            />
          )}
          <IconButton
            onPress={openGalleryHandle}
            icon="pencil-circle"
            iconColor={color}
            size={30}
            style={{position: 'absolute', left: 175, top: 50}}
          />
        </View>

        {errorMsg.other && <SomeText myStyle={err_msg} text={errorMsg.other} />}

        <ScrollView contentContainerStyle={[scrollView_container]}>
          {render_input_field.map(
            (
              {id, name, defaultValue, keyboardType, value, error, disabled},
              i,
            ) => (
              <View key={i}>
                <SomeText text={name} myStyle={{...some_text, marginTop: 15}} />

                <Custom_input
                  placeholder={'Task Name'}
                  defaultValue={defaultValue}
                  value={value}
                  keyboardType={keyboardType}
                  disabled={disabled}
                  error={error && true}
                  onChangeText={text => inputValue(text, id)}
                />
                {error && <SomeText myStyle={err_msg} text={error} />}
              </View>
            ),
          )}
        </ScrollView>

        <Submit_btn
          text={'LogOut'}
          onPress={() => show_alert_handle('LogOut')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView_container: {
    // flex: 1,
    marginVertical: 15,
    gap: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  some_text: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 30,
  },
  err_msg: {
    color: 'red',
    textAlign: 'left',
  },
});
