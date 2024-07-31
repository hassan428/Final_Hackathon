import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {HeadingText} from '../component/Text_component';
import {useNavigation} from '@react-navigation/native';
import {Switch_compo} from '../component/Switch_compo';
import {useSelector} from 'react-redux';

const setting_screen_route = [
  {
    name: 'Permission',
    onPress: () => console.log('Pressed'),
  },
  {
    name: 'Push Notification',
    onPress: () => console.log('Pressed'),
  },
  {
    name: 'Dark Mode',
    onPress: () => console.log('Pressed'),
  },
  {
    name: 'Security',
    onPress: () => console.log('Security Screens'),
  },
  {
    name: 'Help',
    onPress: () => console.log('Help Screens'),
  },
  {
    name: 'Langauge',
    onPress: () => console.log('Langauge Screens'),
  },
  {
    name: 'About Application',
    onPress: () => console.log('About Application Screens'),
  },
];

export const Settings = () => {
  const {container, aligning} = styles;
  const navigation = useNavigation();
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );
  return (
    <>
      <AppBar
        title={`Settings`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        {setting_screen_route.map(({name, onPress}, i) => (
          <View style={[aligning]} key={i}>
            <HeadingText
              onPress={onPress}
              text={name}
              myStyle={{fontSize: 17}}
            />
            {name == 'Permission' ||
            name == 'Push Notification' ||
            name == 'Dark Mode' ? (
              <Switch_compo
                dark_mode={dark_mode}
                switch_text={name}
                color={primary}
                style={{marginVertical: 15}}
              />
            ) : (
              <IconButton
                icon="chevron-right"
                size={30}
                iconColor={color}
                style={{left: 10}}
                onPress={onPress}
              />
            )}
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
  aligning: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
