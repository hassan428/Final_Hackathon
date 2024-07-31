import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated, Image} from 'react-native';
import {Logo} from '../component/Logo';
import {useSelector} from 'react-redux';

const Splash_screen = () => {
  const opacity = useRef(new Animated.Value(0.2)).current;
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.2,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  }, [opacity]);

  const {center, splash_view} = styles;

  return (
    <View style={[splash_view, center, {backgroundColor}]}>
      <Animated.View
        style={[
          center,
          {
            opacity,
          },
        ]}>
        <Image
          resizeMode="contain"
          source={require('../assets/splash_logo.png')}
        />
        <Logo fontSize={40} logoColor={dark_mode ? color : primary} />
      </Animated.View>
    </View>
  );
};

export {Splash_screen};

const styles = StyleSheet.create({
  splash_view: {
    flex: 1,
  },
  center: {alignItems: 'center', justifyContent: 'center'},
});
