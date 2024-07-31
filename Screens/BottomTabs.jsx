import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home} from './Home';
import {Projects} from './Projects';
import {Chat} from './Chat';
import {Profile} from './Profile';
import {primary} from '../config/themeConfig';
import {MoreTools} from '../component/MoreTools';

export const BottomTabs = () => {
  // const {params} = useRoute();
  const [isAddMode, setIsAddMode] = useState(false);

  const AddButton = props => (
    <TouchableOpacity
      {...props}
      style={styles.addButton}
      onPress={() => setIsAddMode(!isAddMode)}>
      <MaterialIcons
        name={!isAddMode ? 'add' : 'close'}
        size={25}
        color="white"
      />
    </TouchableOpacity>
  );

  const tabScreenArray = [
    {
      name: 'Home',
      component: Home,
      options: {
        tabBarIcon: ({color, size, focused}) =>
          focused ? (
            <MaterialCommunityIcons
              size={size}
              name="home-variant"
              color={color}
            />
          ) : (
            <MaterialCommunityIcons
              size={size}
              name="home-variant-outline"
              color={color}
            />
          ),
      },
    },
    {
      name: 'Projects',
      component: Projects,
      options: {
        tabBarIcon: ({color, size, focused}) =>
          focused ? (
            <MaterialIcons size={size} name="folder" color={color} />
          ) : (
            <MaterialIcons size={size} name="folder-open" color={color} />
          ),
      },
    },
    {
      name: 'More',
      component: Projects,
      options: {
        tabBarButton: props => <AddButton {...props} />,
      },
    },

    {
      name: 'Chat',
      component: Chat,
      options: {
        tabBarIcon: ({color, size, focused}) =>
          focused ? (
            <Ionicons size={size} name="chatbubble-ellipses" color={color} />
          ) : (
            <Ionicons
              size={size}
              name="chatbubble-ellipses-outline"
              color={color}
            />
          ),
      },
    },
    {
      name: 'Profile',
      component: Profile,
      options: {
        tabBarIcon: ({color, size, focused}) =>
          focused ? (
            <MaterialCommunityIcons size={size} name="account" color={color} />
          ) : (
            <MaterialCommunityIcons
              size={size}
              name="account-outline"
              color={color}
            />
          ),
      },
    },
  ];

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontFamily: 'arial',
            fontSize: 13,
            fontWeight: 'bold',
          },
        }}>
        {tabScreenArray.map(({name, component, options}, i) => (
          <Tab.Screen
            name={name}
            component={component}
            key={i}
            options={options}
          />
        ))}
      </Tab.Navigator>
      {isAddMode && (
        <MoreTools
          onDismiss={() => setIsAddMode(!isAddMode)}
          visible={isAddMode}
          Component={AddButton}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 60,
    height: 60,
    bottom: 20,
  },
});
