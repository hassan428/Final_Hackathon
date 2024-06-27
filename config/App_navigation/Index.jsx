import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SignUp} from '../../Screens/SignUp';
import {LogIn} from '../../Screens/LogIn';
import {BottomTabs} from '../../Screens/BottomTabs';

const App_navigation = () => {
  const Stack = createNativeStackNavigator();
  const stackScreenArray = [
    {name: 'SignUp', component: SignUp},
    {name: 'LogIn', component: LogIn},
    {name: 'BottomTabs', component: BottomTabs},
  ];
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{headerShown: false}}>
        {stackScreenArray.map(({name, component}, i) => (
          <Stack.Screen name={name} component={component} key={i} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_navigation;

const styles = StyleSheet.create({});
