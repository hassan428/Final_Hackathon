import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export const AppBar = (props) => {
    const { leftIcon, leftIconHandle, rightIcon, rightIconHandle, title } = props


    return <Appbar.Header>
        <Appbar.Action icon={leftIcon} style={[styles.iconStyle]} onPress={() => leftIconHandle && leftIconHandle()} />
        <Appbar.Content titleStyle={{ fontFamily: 'arial' }} style={{ alignItems: 'center', }} title={title} {...props} />
        <Appbar.Action icon={rightIcon} style={rightIcon && [styles.iconStyle]} onPress={() => rightIconHandle && rightIconHandle()} />
    </Appbar.Header>
}

const styles = StyleSheet.create({
    iconStyle: { borderWidth: 1, borderColor: "#e7e6e7" }
})