import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {SomeText} from '../component/Text_component';
import {Avatar, IconButton} from 'react-native-paper';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import {useSelector} from 'react-redux';

export const Add_task = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const navigation = useNavigation();
  const [data, setData] = useState({board: 'Running'});
  const [errorMsg, setErrorMsg] = useState({});
  const inputValue = (text, id) => {
    if (id == 'start_time' || id == 'end_time') {
      if (text == '') {
        setErrorMsg({...errorMsg, [id]: ''});
      } else {
        const timeFormat = /^([1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
        if (timeFormat.test(text)) {
          setErrorMsg({...errorMsg, [id]: ''});
          setData({...data, [id]: text});
        } else {
          setErrorMsg({...errorMsg, [id]: 'HH:MM AM/PM'});
        }
      }
    } else setData({...data, [id]: text});
  };

  const submit_handle = async () => {
    // setData({...data, board});
    console.log('data', data);
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const newDate = new Date();
  const date = newDate.getDate();
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

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

  const start_end_time = [
    {
      id: 'start_time',
      label: 'Start Time',
      placeholder: '9:30 AM',
    },
    {
      id: 'end_time',
      label: 'End Time',
      placeholder: '6:00 PM',
    },
  ];

  const board_detals = [
    {
      label: 'Urgent',
    },
    {
      label: 'Running',
    },
    {
      label: 'Ongoing',
    },
  ];

  const {
    container,
    some_text,
    team_scroll,
    add_icon_style,
    date_style,
    aligning,
    submit_btn_style,
  } = styles;
  return (
    <>
      <AppBar
        title={`Add Task`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <ScrollView style={{backgroundColor}} contentContainerStyle={[container]}>
        <SomeText text="Task Name" myStyle={{...some_text, marginTop: 15}} />

        <Custom_input
          placeholder={'Task Name'}
          onChangeText={text => inputValue(text, 'task_name')}
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
            style={[add_icon_style, {borderColor: primary}]}
            onPress={() => console.log('first')}
          />
        </ScrollView>

        <SomeText text="Date" myStyle={some_text} />

        <SomeText
          text={`${month} ${date}, ${year}`}
          myStyle={{...date_style, color}}
        />

        <View style={[aligning]}>
          {start_end_time.map(({label, id, placeholder}, i) => (
            <View key={i}>
              <SomeText text={label} myStyle={some_text} />
              <Custom_input
                placeholder={`${placeholder}`}
                style={{minWidth: '45%'}}
                error={errorMsg[id] && true}
                maxLength={10}
                onChangeText={text => inputValue(text, id)}
              />
              {errorMsg[id] && (
                <SomeText
                  text={errorMsg[id]}
                  myStyle={{color: 'red', fontSize: 12}}
                />
              )}
            </View>
          ))}
        </View>

        <SomeText text="Board" myStyle={some_text} />

        <View style={[aligning]}>
          {board_detals.map(({label}, i) => {
            const selected = label == data.board;
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
                  setData({...data, board: label});
                }}
              />
            );
          })}
        </View>

        <Submit_btn
          text="Save"
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
  add_icon_style: {
    borderWidth: 2,
    borderRadius: 50,

    margin: 0,
  },
  date_style: {
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: '#E9F1FF',
    padding: 15,
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  aligning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submit_btn_style: {
    marginTop: 25,
    width: '75%',
    borderRadius: 20,
    alignSelf: 'center',
  },
});
