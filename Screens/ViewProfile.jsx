import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {Heading, HeadingText, SomeText} from '../component/Text_component';
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

export const ViewProfile = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {profile} = useSelector(store => store.auth);
  const {username, full_name, email, phone_number, avatar_url, gender} =
    profile;
  const navigation = useNavigation();

  const render_profile_details = [
    {
      name: 'Full Name',
      value: full_name,
    },
    {
      name: 'Username',
      value: username,
    },
    {
      name: 'Gender',
      value: gender,
    },
    {
      name: 'Email',
      value: email,
    },

    {
      name: 'Phone Number',
      value: phone_number,
    },
  ];

  const {container, center, inputs_container, border_style} = styles;
  return (
    <>
      <AppBar
        title={`Profile Details`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />

      <ScrollView style={{backgroundColor}} contentContainerStyle={[container]}>
        <View style={[center, {gap: 5}]}>
          <View style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
            <Avatar.Image
              size={100}
              source={{
                uri: avatar_url,
              }}
            />
          </View>
          <View style={[border_style, {borderColor: primary}]}>
            <ActiveBtn
              text="Edit Profile"
              onPress={() => navigation.navigate('Edit_profile')}
            />
          </View>
        </View>

        <View style={{gap: 20}}>
          {render_profile_details.map(({name, value}, i) => (
            <View key={i} style={[inputs_container]}>
              <SomeText text={name} />
              <View style={[border_style, {borderColor: color}]}>
                <Custom_input value={value} disabled={true} />
              </View>
            </View>
          ))}
        </View>
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
  border_style: {
    borderWidth: 1,
    borderRadius: 15,
  },
  inputs_container: {
    gap: 10,
  },
});
