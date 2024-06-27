import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {Logo} from '../component/Logo';

const Splash_screen = () => {
  const opacity = useRef(new Animated.Value(0.2)).current;

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
    <View style={[splash_view, center]}>
      <Animated.View
        style={[
          center,
          {
            opacity,
          },
        ]}>
        <Logo iconSize={40} fontSize={30} />
      </Animated.View>
    </View>
  );
};

export {Splash_screen};

const styles = StyleSheet.create({
  splash_view: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {alignItems: 'center', justifyContent: 'center'},
});
