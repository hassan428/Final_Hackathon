import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, IconButton} from 'react-native-paper';
import {SomeText} from './Text_component';
import {useNavigation} from '@react-navigation/native';

export const MoreTools = ({visible, Component, onDismiss}) => {
  const navigation = useNavigation();

  const tools_arr = [
    {
      icon: 'square-edit-outline',
      text: 'Create Task',
      onPress: () => navigation.navigate('Add_task'),
    },
    {
      icon: 'plus-box-outline',
      text: 'Create Project',
      onPress: () => console.log('Create Project'),
    },
    {
      icon: 'account-group-outline',
      text: 'Create Team',
      onPress: () => navigation.navigate('Create_team'),
    },
    {
      icon: 'clock-outline',
      text: 'Create Event',
      onPress: () => console.log('Create Event'),
    },
  ];

  const {modal_style, element_container, container, close_btn_style} = styles;
  return (
    <Portal>
      <Modal onDismiss={onDismiss} visible={visible} style={[modal_style]}>
        <View style={[container]}>
          {tools_arr.map(({icon, onPress, text}, i) => (
            <View style={[element_container]} key={i}>
              <IconButton icon={icon} size={25} onPress={onPress} />
              <SomeText
                text={text}
                myStyle={{fontSize: 18, fontWeight: 'bold'}}
                onPress={() => {
                  onPress();
                  onDismiss();
                }}
              />
            </View>
          ))}

          <View style={[close_btn_style]}>
            <Component />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  modal_style: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '50%',
    top: '',
  },
  container: {
    marginHorizontal: 30,
    gap: 15,
  },
  element_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  close_btn_style: {
    alignItems: 'center',
    top: 12,
  },
});
