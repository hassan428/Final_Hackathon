import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Badge, IconButton} from 'react-native-paper';
import {SomeText} from './Text_component';
import {useSelector} from 'react-redux';

export const Chat_card = ({color, name, last_seen}) => {
  // const {id} = useSelector(store => store.add_member);
  // const {other_user_profile} = useSelector(store => store.auth);
  // console.log('id', id);
  // console.log('other_user_profile', other_user_profile);
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
          <SomeText text={name} myStyle={{fontWeight: 900, fontSize: 17}} />
          <SomeText text={last_seen} />
        </View>
      </View>
      <IconButton icon={'camera-outline'} iconColor={color} size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  aligning: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
