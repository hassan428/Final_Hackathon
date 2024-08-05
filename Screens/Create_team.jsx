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
import {useDispatch, useSelector} from 'react-redux';
import {cut_member_action} from '../store/slices/add_slice';
import {create_team_action} from '../store/slices/team_slice';

export const Create_team = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({teamType: 'Private'});
  const [errorMsg, setErrorMsg] = useState({});
  const [btn_loading, set_btn_loading] = useState(false);
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {other_user_profile, profile} = useSelector(store => store.auth);
  const {member_id} = useSelector(store => store.add);
  const filteredUsers = other_user_profile?.filter(user =>
    member_id.includes(user._id),
  );
  const inputValue = (text, id) => {
    setData({...data, [id]: text});
  };
  const submit_handle = async () => {
    // console.log('data', data);
    set_btn_loading(true);
    try {
      const res = await api_create_team({
        ...data,
        members: [...member_id, profile._id],
      });
      dispatch(create_team_action(res.data.team));
      navigation.navigate('Chat');
      // console.log('res', res.data);
    } catch (err) {
      set_btn_loading(false);
      if (err.response.data) {
        const {message, success} = err.response.data;
        if (message.includes('team_name:')) {
          setErrorMsg({team_name: 'Task Name is required.'});
        } else if (message.includes('members:')) {
          setErrorMsg({members: 'The team must have at least one member.'});
        } else {
          setErrorMsg({other: message});
        }
      }
      console.log('err', err.response.data);
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
          error={errorMsg.team_name && true}
        />
        {errorMsg.team_name && (
          <SomeText myStyle={{color: 'red'}} text={errorMsg.team_name} />
        )}

        <SomeText text="Team Member" myStyle={some_text} />
        <ScrollView horizontal contentContainerStyle={[team_scroll]}>
          {filteredUsers?.map(({username, _id, avatar_url}, i) => (
            <View style={{alignItems: 'center', marginVertical: 10}} key={i}>
              <View
                style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
                <Avatar.Image
                  size={45}
                  source={{
                    uri: avatar_url,
                  }}
                />
              </View>
              <IconButton
                onPress={() => dispatch(cut_member_action(_id))}
                icon="close-circle"
                iconColor={color}
                size={20}
                style={{
                  position: 'absolute',
                  bottom: 45,
                  alignItems: 'flex-end',
                }}
              />
              <SomeText text={username} />
            </View>
          ))}
          {other_user_profile?.length !== member_id?.length && (
            <IconButton
              size={30}
              icon={'plus'}
              iconColor={
                errorMsg.members && member_id.length == 0 ? 'red' : primary
              }
              style={[
                icon_btn_style,
                {
                  borderColor:
                    errorMsg.members && member_id.length == 0 ? 'red' : primary,
                  marginVertical: 5,
                },
              ]}
              onPress={() => navigation.navigate('Add_member')}
            />
          )}
        </ScrollView>
        {errorMsg.members && member_id.length == 0 && (
          <SomeText myStyle={{color: 'red'}} text={errorMsg.members} />
        )}
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

        {errorMsg.other && (
          <SomeText
            myStyle={{color: 'red', textAlign: 'center', marginTop: 20}}
            text={errorMsg.other}
          />
        )}

        <Submit_btn
          text="Create Team"
          loading={btn_loading}
          disabled={btn_loading}
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
