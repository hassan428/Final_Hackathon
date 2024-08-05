import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {SomeText} from '../component/Text_component';
import {Avatar, IconButton} from 'react-native-paper';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import {useDispatch, useSelector} from 'react-redux';
import {cut_member_action, cut_team_action} from '../store/slices/add_slice';
import {api_add_task} from '../config/Apis';
import {add_task_action} from '../store/slices/task_slice';

export const Add_task = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const navigation = useNavigation();
  const [btn_loading, set_btn_loading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({board: 'Running'});
  const [errorMsg, setErrorMsg] = useState({});
  const {team} = useSelector(store => store.team);
  const {team_id} = useSelector(store => store.add);
  const filteredUsers = team.filter(team => team_id.includes(team._id));

  const inputValue = (text, id) => {
    setErrorMsg({...errorMsg, [id]: ''});
    if (id !== 'task_name') {
      if (text !== '') {
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
    // console.log('data', data);
    set_btn_loading(true);
    try {
      const res = await api_add_task({
        ...data,
        team: [...team_id],
        date: newDate,
      });
      dispatch(add_task_action(res.data.task));
      navigation.navigate('Projects');
      // console.log('res', res.data);
    } catch (err) {
      set_btn_loading(false);
      if (err.response.data) {
        const {message, success} = err.response.data;
        if (message.includes('task_name:')) {
          setErrorMsg({task_name: 'Task Name is required.'});
        } else if (message.includes('team:')) {
          setErrorMsg({team: 'At least one team must be selected.'});
        } else if (message.includes('start_time:')) {
          setErrorMsg({start_time: 'Start Time is required.'});
        } else if (message.includes('end_time:')) {
          setErrorMsg({end_time: 'End Time is required.'});
        }
      } else {
        setErrorMsg({other: message});
      }
      console.log('error', err.response.data);
    }
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
          error={errorMsg.task_name && true}
        />
        {errorMsg.task_name && (
          <SomeText myStyle={{color: 'red'}} text={errorMsg.task_name} />
        )}
        <SomeText text="Team" myStyle={some_text} />

        <ScrollView horizontal contentContainerStyle={[team_scroll]}>
          {filteredUsers?.map(({team_name, _id, team_avatar_url}, i) => (
            <View style={{alignItems: 'center', marginVertical: 10}} key={i}>
              <View
                style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
                <Avatar.Image
                  size={45}
                  source={{
                    uri: team_avatar_url,
                  }}
                />
              </View>

              <IconButton
                onPress={() => dispatch(cut_team_action(_id))}
                icon="close-circle"
                iconColor={color}
                size={20}
                style={{
                  position: 'absolute',
                  bottom: 45,
                  alignItems: 'flex-end',
                }}
              />
              <SomeText text={team_name} />
            </View>
          ))}
          {team.length == 0 ||
            (team.length !== team_id.length && (
              <IconButton
                size={30}
                icon={'plus'}
                iconColor={
                  errorMsg.team && team_id.length == 0 ? 'red' : primary
                }
                style={[
                  add_icon_style,
                  {
                    borderColor:
                      errorMsg.team && team_id.length == 0 ? 'red' : primary,
                    marginVertical: 5,
                  },
                ]}
                onPress={() => navigation.navigate('Add_team')}
              />
            ))}
        </ScrollView>
        {errorMsg.team && team_id.length == 0 && (
          <SomeText myStyle={{color: 'red'}} text={errorMsg.team} />
        )}

        <SomeText text="Date" myStyle={some_text} />

        <Custom_input value={`${month} ${date}, ${year}`} disabled />

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
          text="Add Task"
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
    gap: 15,
  },
  add_icon_style: {
    borderWidth: 2,
    borderRadius: 50,
    margin: 0,
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
