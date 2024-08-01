import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {HeadingText, SomeText} from './Text_component';
import {ActiveBtn} from './CustomBtn';

export const Alert_dialog = ({
  showAlert,
  hideDialog,
  text,
  title,
  btn_one,
  btn_one_handle,
  btn_two,
  btn_two_handle,
}) => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  return (
    <Portal>
      <Dialog
        style={{backgroundColor, borderWidth: 1, borderColor: color}}
        visible={showAlert}
        onDismiss={() => hideDialog()}>
        <Dialog.Title style={{color}}>
          <HeadingText text={title} />
        </Dialog.Title>
        <Dialog.Content>
          <SomeText text={text} />
        </Dialog.Content>
        <Dialog.Actions>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {btn_two && (
              <ActiveBtn onPress={() => btn_two_handle()} text={btn_two} />
            )}
            {btn_one && (
              <ActiveBtn onPress={() => btn_one_handle()} text={btn_one} />
            )}
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
