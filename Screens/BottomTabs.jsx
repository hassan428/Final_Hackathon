import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SignUp} from './SignUp';
import {LogIn} from './LogIn';
const Tab = createBottomTabNavigator();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

const BottomTabs = () => {
  const {params} = useRoute();

  const tabScreenArray = [
    {
      name: 'SignUp',
      component: SignUp,
      options: {
        tabBarIcon: ({color, size, focused}) => (
          <FontAwesome size={size} name="sign-in" color={color} />
        ),
      },
    },
    {
      name: 'LogIn',
      component: LogIn,
      options: {
        tabBarIcon: ({color, size, focused}) => (
          <FontAwesome size={size} name="sign-in" color={color} />
        ),
      },
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Todo"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'pink',
        tabBarInactiveBackgroundColor: 'white',
      }}>
      {tabScreenArray.map(({name, component, options, initialParams}, i) => (
        <Tab.Screen
          name={name}
          component={component}
          key={i}
          options={options}
          initialParams={initialParams}
        />
      ))}
    </Tab.Navigator>
  );
};

export {BottomTabs};

const styles = StyleSheet.create({});
