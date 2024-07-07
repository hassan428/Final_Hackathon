import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { Home } from './Home';
import { Projects } from './Projects';
import { Chat } from './Chat';
import { Profile } from './Profile';
import { primary } from '../config/App_navigation/themeConfig';

export const BottomTabs = () => {
  const { params } = useRoute();

  const tabScreenArray = [
    {
      name: 'Home',
      component: Home,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <MaterialCommunityIcons size={size} name="home-variant" color={color} /> :
            <MaterialCommunityIcons size={size} name="home-variant-outline" color={color} />
        ),
      },
    },
    {
      name: 'Projects',
      component: Projects,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <MaterialIcons size={size} name="folder" color={color} /> :
            <MaterialIcons size={size} name="folder-open" color={color} />
        ),
      },
    },
    {
      name: 'Chat',
      component: Chat,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <Ionicons size={size} name="chatbubble-ellipses" color={color} /> :
            <Ionicons size={size} name="chatbubble-ellipses-outline" color={color} />
        ),
      },
    },
    {
      name: 'Profile',
      component: Profile,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          focused ?
            <MaterialCommunityIcons size={size} name="account" color={color} /> :
            <MaterialCommunityIcons size={size} name="account-outline" color={color} />
        ),
      },
    },
  ];
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Todo"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontFamily: 'arial', fontSize: 13, fontWeight: 'bold' },
      }}>
      {tabScreenArray.map(({ name, component, options, initialParams }, i) => (
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

// import * as React from 'react';
// import { BottomNavigation, Text } from 'react-native-paper';
// import { Home } from './Home';
// import { Chat } from './Chat';
// import { Projects } from './Projects';
// import { Profile } from './Profile';

// export const BottomTabs = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home', focusedIcon: 'home-variant', unfocusedIcon: 'home-variant-outline' },
//     { key: 'projects', title: 'Projects', focusedIcon: 'folder-text', unfocusedIcon: 'folder-text-outline' },
//     { key: 'chat', title: 'Chat', focusedIcon: 'chat-processing', unfocusedIcon: 'chat-processing-outline' },
//     { key: 'profile', title: 'Profile', focusedIcon: 'account-multiple', unfocusedIcon: 'account-multiple-outline' },
//   ]);

//   const renderScene = BottomNavigation.SceneMap({
//     home: Home,
//     projects: Projects,
//     chat: Chat,
//     profile: Profile,
//   });

//   return (
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//     />
//   );
// };
