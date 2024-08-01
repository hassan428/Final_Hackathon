import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {HeadingText, SomeText} from '../component/Text_component';
import {Avatar, Badge, Icon, IconButton} from 'react-native-paper';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import {launchImageLibrary} from 'react-native-image-picker';
import {api_create_team} from '../config/Apis';
import {useSelector} from 'react-redux';

export const Create_team = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({teamType: 'Private'});
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  // const [errorMsg, setErrorMsg] = useState({});
  const inputValue = (text, id) => {
    setData({...data, [id]: text});
  };

  const submit_handle = async () => {
    // console.log('data', data);
    try {
      const res = await api_create_team(data);
      console.log('res', res.data);
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

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
      setData({...data, logo_url: assets[0].uri});
    }
  };

  const team_member_array = [
    {
      avatar_uri:
        'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
      name: 'Jeny',
    },
    {
      avatar_uri:
        'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
      name: 'Jeny',
    },
    {
      avatar_uri:
        'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
      name: 'Jeny',
    },
  ];

  const type_detals = [
    {
      label: 'Private',
    },
    {
      label: 'Public',
    },
    {
      label: 'Secret',
    },
  ];

  const {
    container,
    some_text,
    team_scroll,
    icon_btn_style,
    aligning,
    submit_btn_style,
    logo_view_style,
  } = styles;
  return (
    <>
      <AppBar
        title={`Create Team`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <ScrollView style={{backgroundColor}} contentContainerStyle={[container]}>
        <View style={[logo_view_style]}>
          {data.logo_url ? (
            <>
              <Avatar.Image
                style={[icon_btn_style, {margin: 7, borderColor: primary}]}
                size={90}
                source={{
                  uri: data.logo_url,
                }}
              />
              <IconButton
                onPress={openGalleryHandle}
                icon="pencil-circle"
                iconColor={color}
                size={30}
                style={{position: 'absolute', left: 175, top: 50}}
              />
            </>
          ) : (
            <IconButton
              size={70}
              // icon={'progress-upload'}
              icon={'cloud-upload'}
              iconColor={primary}
              style={[icon_btn_style, {borderColor: primary}]}
              onPress={openGalleryHandle}
            />
          )}

          <HeadingText text="Upload logo file" />
          <SomeText
            text="Your logo will publish always"
            myStyle={{fontSize: 15}}
          />
        </View>

        <SomeText text="Team Name" myStyle={{...some_text, marginTop: 15}} />

        <Custom_input
          placeholder={'Team Name'}
          onChangeText={text => inputValue(text, 'team_name')}
        />

        <SomeText text="Team Member" myStyle={some_text} />

        <ScrollView horizontal contentContainerStyle={[team_scroll]}>
          {team_member_array.map(({avatar_uri, name}, i) => (
            <View style={{alignItems: 'center'}} key={i}>
              <Avatar.Image
                size={45}
                source={{
                  uri: avatar_uri,
                }}
              />
              <SomeText text={name} />
            </View>
          ))}
          <IconButton
            size={30}
            icon={'plus'}
            iconColor={primary}
            style={[icon_btn_style, {margin: 0, borderColor: primary}]}
            onPress={() => console.log('first')}
          />
        </ScrollView>

        <SomeText text="Type" myStyle={some_text} />

        <View style={[aligning]}>
          {type_detals.map(({label}, i) => {
            const selected = label == data.teamType;
            return (
              <ActiveBtn
                key={i}
                text={label}
                mode="outlined"
                myLabelStyle={{
                  color: selected ? color : 'gray',
                  fontWeight: selected ? 900 : '',
                }}
                style={{
                  borderRadius: 10,
                  borderColor: selected ? primary : 'gray',
                }}
                onPress={() => {
                  setData({...data, teamType: label});
                }}
              />
            );
          })}
        </View>

        <Submit_btn
          text="Create Team"
          myStyle={submit_btn_style}
          onPress={submit_handle}
        />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  some_text: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 30,
  },
  team_scroll: {
    gap: 10,
  },
  icon_btn_style: {
    borderWidth: 2,
    borderRadius: 50,
  },
  aligning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submit_btn_style: {
    marginTop: 25,
    width: '75%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  logo_view_style: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
