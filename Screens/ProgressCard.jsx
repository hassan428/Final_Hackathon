import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SomeText} from '../component/Text_component';
import {primary} from '../config/App_navigation/themeConfig';

export const ProgressCard = props => {
  const {time, heading, title} = props;
  const {container} = styles;
  return (
    <View style={[container]}>
      <View>
        <SomeText text={title} />
        <SomeText text={heading} myStyle={{fontWeight: 900, fontSize: 15}} />
        <SomeText text={time} />
      </View>
      <SomeText
        text={'60%'}
        myStyle={{
          fontWeight: 900,
          fontSize: 15,
          borderWidth: 5,
          borderRadius: 100,
          borderColor: primary,
          padding: 10,
          textAlign: 'center'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
