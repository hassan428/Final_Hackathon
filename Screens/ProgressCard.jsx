import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SomeText} from '../component/Text_component';
import {Circular_progress} from '../component/Circular_proress';

export const ProgressCard = props => {
  const {time, heading, title, percentage} = props;

  const {container} = styles;
  return (
    <View style={[container]}>
      <View>
        <SomeText text={title} />
        <SomeText text={heading} myStyle={{fontWeight: 900, fontSize: 15}} />
        <SomeText text={time} />
      </View>
      <Circular_progress size={50} strokeWidth={8} percentage={percentage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
