import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';

export const AppBar = props => {
  const {leftIcon, leftIconHandle, rightIcon, rightIconHandle, title} = props;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <Appbar.Header style={{backgroundColor}}>
      <Appbar.Action
        icon={leftIcon}
        color={color}
        onPress={() => leftIconHandle && leftIconHandle()}
      />
      <Appbar.Content
        titleStyle={{fontFamily: 'arial', color}}
        style={{alignItems: 'center'}}
        title={title}
        {...props}
      />
      <Appbar.Action
        icon={rightIcon}
        style={rightIcon && [styles.iconStyle]}
        color={color}
        onPress={() => rightIconHandle && rightIconHandle()}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({});
