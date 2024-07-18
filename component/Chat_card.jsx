import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Badge, IconButton} from 'react-native-paper';
import {SomeText} from './Text_component';

export const Chat_card = () => {
  const {aligning} = styles;
  return (
    <View
      style={[aligning, {justifyContent: 'space-between', marginVertical: 20}]}>
      <View style={[aligning, {gap: 5}]}>
        <Avatar.Image
          size={55}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/011/675/374/small_2x/man-avatar-image-for-profile-png.png',
          }}
        />
        <Badge
          size={10}
          style={{
            position: 'absolute',
            left: 45,
            backgroundColor: 'green',
          }}></Badge>
        <View>
          <SomeText
            text={'Jenny Alexander'}
            myStyle={{fontWeight: 900, fontSize: 17}}
          />
          <SomeText text={'Active now'} />
        </View>
      </View>
      <IconButton icon={'camera-outline'} size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  aligning: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
