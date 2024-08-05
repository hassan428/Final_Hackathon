import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Avatar, Badge, IconButton} from 'react-native-paper';
import {SomeText} from './Text_component';

export const Member_card = ({
  color,
  username,
  email,
  add_member_handle,
  avatar_url,
  icon_name,
}) => {
  const {aligning} = styles;
  return (
    <View
      style={[aligning, {justifyContent: 'space-between', marginVertical: 20}]}>
      <View style={[aligning, {gap: 5}]}>
        <View style={{borderWidth: 2, borderColor: color, borderRadius: 100}}>
          <Avatar.Image
            size={55}
            source={{
              uri: avatar_url,
            }}
          />
        </View>
        <Badge
          size={10}
          style={{
            position: 'absolute',
            left: 45,
            backgroundColor: 'green',
          }}></Badge>
        <View
          style={{
            maxWidth: '75%',
          }}>
          <SomeText text={username} myStyle={{fontWeight: 900, fontSize: 17}} />
          <SomeText text={email} />
        </View>
      </View>
      <IconButton
        icon={icon_name}
        onPress={add_member_handle}
        iconColor={color}
        size={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  aligning: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
