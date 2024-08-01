import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {HeadingText, SomeText} from './Text_component';

export const Alert_dialog = ({showAlert, hideDialog, text, title, btn}) => {
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
        <Dialog.Actions>{btn}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
