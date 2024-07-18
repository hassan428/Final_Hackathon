import {StyleSheet, View} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {HeadingText, SomeText} from '../component/Text_component';
import {ActiveBtn} from '../component/CustomBtn';
import {primary} from '../config/themeConfig';
import {useSelector} from 'react-redux';

const profile_screen_route = [
  {
    name: 'My Projects',
  },
  {
    name: 'Join a Team',
  },
  {
    name: 'Settings',
  },
  {
    name: 'My Task',
  },
];

export const Profile = () => {
  const store = useSelector(store => store.auth);
  const {username, full_name, email} = store.profile;
  const {container, center, edit_btn, aligning, aligning_2} = styles;
  return (
    <>
      <AppBar
        title={`Profile`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container]}>
        <View style={[center, {gap: 5}]}>
          <Avatar.Image
            size={100}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
            }}
          />
          <View style={[center]}>
            <HeadingText text={full_name} />
            <SomeText text={username} />
            <View style={[edit_btn]}>
              <ActiveBtn text="Edit" />
            </View>
          </View>
        </View>

        <View style={[aligning]}>
          <View style={[center]}>
            <IconButton
              icon="clock-outline"
              size={25}
              style={{position: 'relative', top: 10}}
              onPress={() => console.log('Pressed')}
            />
            <HeadingText text={'5'} />
            <SomeText text={'On Going'} />
          </View>

          <View style={[center]}>
            <IconButton
              icon="sticker-check-outline"
              size={25}
              style={{position: 'relative', top: 10}}
              onPress={() => console.log('Pressed')}
            />
            <HeadingText text={'25'} />
            <SomeText text={'Total Complete'} />
          </View>
        </View>

        {profile_screen_route.map(({name}, i) => (
          <View style={[aligning_2]} key={i}>
            <HeadingText text={name} myStyle={{fontSize: 17}} />
            <IconButton
              icon="chevron-right"
              size={30}
              style={{left: 10}}
              onPress={() => console.log('Pressed')}
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
    backgroundColor: 'white',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit_btn: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: primary,
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
