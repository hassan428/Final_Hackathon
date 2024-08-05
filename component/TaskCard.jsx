import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeadingText, SomeText} from './Text_component';
import {Avatar, ProgressBar} from 'react-native-paper';
import {useSelector} from 'react-redux';

export const TaskCard = ({
  heading,
  text,
  progress_str,
  progress_num,
  isThemeChange,
  member_array,
}) => {
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );

  const styles2 = StyleSheet.create({
    ...styles,
    container: {
      ...styles.container,
      backgroundColor: isThemeChange ? primary : backgroundColor,
      borderColor: primary,
    },
    fontColor: {
      color: dark_mode ? 'white' : isThemeChange ? 'white' : primary,
    },
  });

  const {container, avatar_view, second_container, fontColor} = styles2;
  return (
    <View style={[container]}>
      <View>
        <HeadingText text={heading} myStyle={{...fontColor}} />
        <SomeText text={text} myStyle={{...fontColor}} />
      </View>

      <View style={[second_container]}>
        <View style={[avatar_view]}>
          {member_array?.map(({avatar_url}, i) => (
            <View
              key={i}
              style={{
                borderWidth: 2,
                borderColor: isThemeChange ? 'black' : primary,
                borderRadius: 100,
              }}>
              <Avatar.Image
                size={35}
                source={{
                  uri: avatar_url,
                }}
              />
            </View>
          ))}
        </View>

        <View style={{width: '50%', gap: 5}}>
          <SomeText
            text={progress_str}
            myStyle={{...fontColor, textAlign: 'right'}}
          />
          <ProgressBar
            progress={progress_num}
            color={isThemeChange ? 'white' : primary}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 2,
    maxWidth: 320,
  },
  avatar_view: {
    flexDirection: 'row',
  },
  second_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
