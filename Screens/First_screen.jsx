import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import {Logo} from '../component/Logo';
import {IconButton, ProgressBar} from 'react-native-paper';
import {
  Start_screen_text,
  Start_screen_title,
} from '../component/Text_component';
import {useSelector} from 'react-redux';

export const First_screen = () => {
  const navigation = useNavigation();
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );
  // require('../assets/light_mode/third_screen_img.jpeg')
  const {container, get_start_view, btn_view, progress_view} = styles;
  return (
    <View style={[container, {backgroundColor}]}>
      <Image
        resizeMode="contain"
        source={
          dark_mode
            ? require('../assets/dark_mode/first_screen_img.jpeg')
            : require('../assets/light_mode/first_screen_img.jpeg')
        }
      />

      <View style={[get_start_view]}>
        <Start_screen_text text={'Task Management'} />

        <Start_screen_title
          firstText={"Let's create a "}
          colorText={'space'}
          lastText={'for your workflows.'}
        />

        <View style={[progress_view]}>
          <ProgressBar progress={1} color={primary} style={{width: 10}} />
          <ProgressBar progress={0} color={'gray'} style={{width: 5}} />
          <ProgressBar progress={0} color={'gray'} style={{width: 5}} />
        </View>

        <View style={[btn_view]}>
          <ActiveBtn
            text={'Skip'}
            onPress={() => navigation.navigate('LogIn')}
          />
          <IconButton
            icon="arrow-right"
            iconColor={primary}
            size={20}
            onPress={() => navigation.navigate('Second_screen')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  get_start_view: {
    width: '100%',
    flex: 1,
    gap: 15,
  },
  btn_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress_view: {
    marginLeft: 20,
    flexDirection: 'row',
    gap: 5,
  },
});
