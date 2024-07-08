import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SomeText} from './Text_component';
import {Avatar, ProgressBar} from 'react-native-paper';

export const ProjectsCard = props => {
  const {progress_num, progress_str, heading, title} = props;
  const {avatar_view, aligning, container} = styles;
  return (
    <View style={[container]}>
      <View style={[aligning]}>
        <View>
          <SomeText text={heading} myStyle={{fontWeight: 'bold'}} />
          <SomeText text={title} />
        </View>
        <SomeText
          text={progress_str}
          myStyle={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'green',
            padding: 5,
            fontWeight: 'bold',
          }}
        />
      </View>

      <View style={[aligning, {justifyContent: 'space-evenly'}]}>
        <View style={[avatar_view]}>
          <Avatar.Image
            size={35}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
            }}
          />
          <Avatar.Image
            size={35}
            style={{right: 10}}
            source={{
              uri: 'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720224000&semt=ais_user',
            }}
          />
        </View>
        <View style={{width: '80%'}}>
          <ProgressBar progress={progress_num} color={'green'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 20,
    gap: 20,
    marginVertical: 5,
  },
  avatar_view: {
    flexDirection: 'row',
  },
  aligning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
