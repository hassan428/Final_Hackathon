import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActiveBtn, Submit_btn} from '../component/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import {Logo} from '../component/Logo';
import {primary} from '../config/themeConfig';
import {IconButton, ProgressBar} from 'react-native-paper';
import {
  Start_screen_text,
  Start_screen_title,
} from '../component/Text_component';

export const Third_screen = () => {
  const navigation = useNavigation();

  const {
    container,
    get_start_view,
    title_style,
    fontFamily,
    text_style,
    btn_view,
    progress_view,
  } = styles;
  return (
    <View style={[container]}>
      <Image
        resizeMode="contain"
        source={require('../assets/third_screen_img.jpeg')}
      />

      <View style={[get_start_view]}>
        <Start_screen_text text={'Task Management'} />

        <Start_screen_title
          firstText={'Manage your'}
          colorText={'Tasks'}
          lastText={'quickly for Results✌'}
        />

        <View style={[progress_view]}>
          <ProgressBar progress={0} color={'gray'} style={{width: 5}} />
          <ProgressBar progress={0} color={'gray'} style={{width: 5}} />
          <ProgressBar progress={1} color={primary} style={{width: 10}} />
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
            onPress={() => navigation.navigate('LogIn')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  get_start_view: {
    width: '100%',
    flex: 1,
    gap: 15,
    justifyContent: 'center',
  },
  text_style: {
    marginLeft: 20,
    fontWeight: 500,
    fontSize: 30,
    width: '70%',
    color: 'black',
  },
  title_style: {
    marginLeft: 20,
    fontSize: 15,
    color: primary,
  },
  fontFamily: {
    fontFamily: 'arial',
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
