import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { primary } from '../config/App_navigation/themeConfig';

export const Logo = ({iconSize, fontSize}) => {
  const {iconContainer, iconSpacing, splash_text} = styles;

  // const icon = [
  //   {
  //     Tag: MaterialIcons,
  //     name: 'check-circle',
  //     color: '#4CAF50',
  //   },
  //   {
  //     Tag: FontAwesome5,
  //     name: 'tasks',
  //     color: '#FF9800',
  //   },
  //   {
  //     Tag: MaterialIcons,
  //     name: 'event-note',
  //     color: '#2196F3',
  //   },
  // ];

  // const text = [
  //   {
  //     letter: 'LO',
  //     color: '#4CAF50',
  //   },
  //   {
  //     letter: 'G',
  //     color: '#FF9800',
  //   },
  //   {
  //     letter: 'O',
  //     color: '#2196F3',
  //   },
  // ];

  return (
    // <>
    //   <View style={iconContainer}>
    //     {icon.map(({Tag, name, color}, i) => (
    //       <Tag
    //         name={name}
    //         style={iconSpacing}
    //         size={iconSize}
    //         color={color}
    //         key={i}
    //       />
    //     ))}
    //   </View>

      <Text style={[splash_text, {fontSize}]}>
          Taskcy
      </Text>
    // </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconSpacing: {
    marginLeft: 2,
    marginRight: 2,
  },
  splash_text: {
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: 'monospace',
    color: primary,
  },
});
