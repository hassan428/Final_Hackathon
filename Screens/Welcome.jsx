import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Submit_btn} from '../component/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import {Logo} from '../component/Logo';
import {Heading, SomeText} from '../component/Text_component';
import {useSelector} from 'react-redux';

export const Welcome = () => {
  const navigation = useNavigation();
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  const {
    container,
    get_start_view,
    title_style,
    text_style,
    get_start_container,
  } = styles;
  return (
    <View style={[container, {backgroundColor: primary}]}>
      <Image
        resizeMode="cover"
        source={require('../assets/welcom_screen_img.png')}
      />
      <View style={[get_start_container, {backgroundColor}]}>
        <View style={[get_start_view]}>
          <Logo fontSize={40} logoColor={primary} />

          <Heading myStyle={title_style} text={'Building Better Workplaces'} />

          <SomeText
            myStyle={text_style}
            text="Create a unique emotional story that describes better than words"
          />

          <Submit_btn
            onPress={() => navigation.navigate('First_screen')}
            text={'Get Started'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  get_start_container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  get_start_view: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 50,
  },
  title_style: {
    textAlign: 'center',
  },
  text_style: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8D8D8D',
    width: '92%',
    marginBottom: 20,
  },
});
