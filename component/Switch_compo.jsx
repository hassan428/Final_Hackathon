import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {set_dark_mode} from '../store/slices/theme_slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DARK_MODE_KEY} from '@env';

export const Switch_compo = props => {
  const {switch_text, dark_mode} = props;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (switch_text == 'Dark Mode') {
      dispatch(set_dark_mode(!dark_mode));
      AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(!dark_mode));
    }
  };

  return (
    <Switch
      value={switch_text == 'Dark Mode' ? dark_mode : isSwitchOn}
      {...props}
      color={primary}
      onValueChange={onToggleSwitch}
    />
  );
};

const styles = StyleSheet.create({});
