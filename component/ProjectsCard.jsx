import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SomeText} from './Text_component';
import {Avatar, ProgressBar} from 'react-native-paper';
import {useSelector} from 'react-redux';

export const ProjectsCard = ({
  progress_num,
  progress_str,
  heading,
  title,
  member_array,
}) => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

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

      <View style={[aligning, {justifyContent: 'space-between'}]}>
        <View style={[avatar_view]}>
          {member_array?.map(({avatar_url}, i) => (
            <View
              key={i}
              style={{
                borderWidth: 2,
                borderColor: color,
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
        <View style={{width: '70%'}}>
          <ProgressBar progress={progress_num} color={primary} />
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
