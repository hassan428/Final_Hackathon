import * as React from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  Icon,
} from 'react-native-paper';
import {Heading, HeadingText, SomeText} from './Text_component';
import {useSelector} from 'react-redux';
import {ActiveBtn} from './CustomBtn';
import {Logo} from './Logo';

export const No_internet_alert = () => {
  const {primary, backgroundColor, color, dark_mode} = useSelector(
    store => store.theme,
  );
  const exit = () => BackHandler.exitApp();
  
  const {containerStyle, iconContainer} = styles;
  return (
    <PaperProvider>
      <Modal
        visible={true}
        onDismiss={exit}
        contentContainerStyle={[containerStyle, {backgroundColor}]}>
        <View style={iconContainer}>
          <Icon source="wifi-strength-1-alert" color={color} size={75} />
        </View>
        <Heading text="Whoops!" />
        <HeadingText text="No Internet Connection" />
        <SomeText
          myStyle={{textAlign: 'center', width: '75%', marginBottom: 10}}
          text="Please check your internet settings and try again."
        />
        <ActiveBtn text="OK" mode="outlined" onPress={exit} />
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 20,
  },
  iconContainer: {
    marginBottom: 10,
  },
});
