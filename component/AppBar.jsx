import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {SomeText} from './Text_component';

export const AppBar = props => {
  const {
    leftIcon,
    leftText,
    leftIconHandle,
    rightIcon,
    rightText,
    rightIconHandle,
    title,
  } = props;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);

  return (
    <Appbar.Header style={{backgroundColor}}>
      {leftText ? (
        <SomeText
          text={leftText}
          myStyle={{marginLeft: 5}}
          onPress={() => leftIconHandle && leftIconHandle()}
        />
      ) : (
        <Appbar.Action
          icon={leftIcon}
          color={color}
          onPress={() => leftIconHandle && leftIconHandle()}
        />
      )}
      <Appbar.Content
        titleStyle={{fontFamily: 'arial', color}}
        style={{alignItems: 'center'}}
        title={title}
        {...props}
      />
      {rightText ? (
        <SomeText
          text={rightText}
          myStyle={{marginRight: 5, marginBottom: 5}}
          onPress={() => rightIconHandle && rightIconHandle()}
        />
      ) : (
        <Appbar.Action
          icon={rightIcon}
          style={rightIcon && [styles.iconStyle]}
          color={color}
          onPress={() => rightIconHandle && rightIconHandle()}
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({});
