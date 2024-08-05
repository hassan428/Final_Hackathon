import {StyleSheet, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {HeadingText, SomeText} from '../component/Text_component';
import {ActiveBtn} from '../component/CustomBtn';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export const Profile = () => {
  const store = useSelector(store => store.auth);
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {username, full_name, email, avatar_url} = store.profile;
  const {container, center, edit_btn, aligning, aligning_2} = styles;
  const navigation = useNavigation();
  const {task} = useSelector(store => store.task);

  const profile_task_details = [
    {
      icon: 'clock-outline',
      quantity: task.length,
      text: 'On Going',
    },
    {
      icon: 'sticker-check-outline',
      quantity: '0',
      text: 'Total Complete',
    },
  ];

  const profile_screen_route = [
    {
      name: 'My Projects',
      onPress: () => navigation.navigate('Projects'),
    },
    {
      name: 'Join a Team',
      onPress: () => console.log('Join a Team Screens'),
    },
    {
      name: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      name: 'My Task',
      onPress: () => navigation.navigate('Projects'),
    },
  ];

  return (
    <>
      <AppBar
        title={`Profile`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <View style={[center, {gap: 5}]}>
          <View style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
            <Avatar.Image
              size={100}
              source={{
                uri: avatar_url,
              }}
            />
          </View>
          <View style={[center]}>
            <HeadingText text={full_name} myStyle={{textAlign: 'center'}} />
            <SomeText text={username} myStyle={{textAlign: 'center'}} />
            <View style={[edit_btn, {borderColor: primary}]}>
              <ActiveBtn
                text="View Profile"
                onPress={() => navigation.navigate('ViewProfile')}
              />
            </View>
          </View>
        </View>

        <View style={[aligning]}>
          {profile_task_details.map(({icon, quantity, text}, i) => (
            <View style={[center]} key={i}>
              <IconButton
                icon={icon}
                size={25}
                iconColor={color}
                style={{position: 'relative', top: 10}}
              />
              <HeadingText text={quantity} />
              <SomeText text={text} />
            </View>
          ))}
        </View>

        {profile_screen_route.map(({name, onPress}, i) => (
          <View style={[aligning_2]} key={i}>
            <HeadingText
              onPress={onPress}
              text={name}
              myStyle={{fontSize: 17}}
            />
            <IconButton
              icon="chevron-right"
              size={30}
              iconColor={color}
              style={{left: 10}}
              onPress={onPress}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit_btn: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 5,
  },
  aligning: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
  },
  aligning_2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
