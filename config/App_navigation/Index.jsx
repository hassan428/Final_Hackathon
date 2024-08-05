import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SignUp} from '../../Screens/SignUp';
import {LogIn} from '../../Screens/LogIn';
import {BottomTabs} from '../../Screens/BottomTabs';
import {Welcome} from '../../Screens/Welcome';
import {useDispatch, useSelector} from 'react-redux';
import {Splash_screen} from '../../Screens/Splash_screen';
import {First_screen} from '../../Screens/First_screen';
import {Second_screen} from '../../Screens/Second_screen';
import {Third_screen} from '../../Screens/Third_screen';
import {OTPVerification} from '../../Screens/OTPVerification';
import {api_auth_check} from '../Apis';
import {
  islogged_action,
  other_user_profile_action,
  profile_action,
} from '../../store/slices/auth_slice';
import {NewPassword} from '../../Screens/NewPassword';
import {Create_team} from '../../Screens/Create_team';
import {Add_task} from '../../Screens/Add_task';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Settings} from '../../Screens/Setting';
import {set_dark_mode} from '../../store/slices/theme_slice';
import {Edit_profile} from '../../Screens/Edit_profile';
import {Add_member} from '../../Screens/Add_member';
import {auth_check_team_action} from '../../store/slices/team_slice';
import {Add_team} from '../../Screens/Add_team';
import {auth_check_task_action} from '../../store/slices/task_slice';
import {USER_UID, DARK_MODE_KEY} from '@env';
import {No_internet_alert} from '../../component/No_internet_alert';
import {ViewProfile} from '../../Screens/ViewProfile';
const App_navigation = () => {
  const [splash_screen, setSplash_screen] = useState(true);
  const [no_internet, set_no_internet] = useState(false);
  const {islogged} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const splashOffHandle = () =>
    setTimeout(() => {
      setSplash_screen(false);
    }, 3000);

  const auth_check_handle = async () => {
    let value = await AsyncStorage.getItem(DARK_MODE_KEY);
    value = JSON.parse(value);
    // console.log('value', value);
    dispatch(set_dark_mode(value));

    try {
      const res = await api_auth_check();
      // console.log('res', res.data);
      dispatch(profile_action(res.data.data));
      dispatch(other_user_profile_action(res.data.other_user));
      dispatch(auth_check_team_action(res.data.team));
      dispatch(auth_check_task_action(res.data.task));
      dispatch(islogged_action(true));
      splashOffHandle();
    } catch (error) {
      await AsyncStorage.removeItem(USER_UID);
      if (error.message == 'Network Error') {
        set_no_internet(true);
      }
      splashOffHandle();
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    auth_check_handle();
  }, []);

  const Stack = createNativeStackNavigator();

  const stackScreenArray = islogged
    ? [
        {name: 'BottomTabs', component: BottomTabs},
        {name: 'Create_team', component: Create_team},
        {name: 'Add_task', component: Add_task},
        {name: 'Add_member', component: Add_member},
        {name: 'Add_team', component: Add_team},
        {name: 'Edit_profile', component: Edit_profile},
        {name: 'ViewProfile', component: ViewProfile},
        {name: 'Settings', component: Settings},
        {name: 'NewPassword', component: NewPassword},
        {name: 'OTPVerification', component: OTPVerification},
      ]
    : [
        {name: 'Welcome', component: Welcome},
        {name: 'First_screen', component: First_screen},
        {name: 'Second_screen', component: Second_screen},
        {name: 'Third_screen', component: Third_screen},
        {name: 'SignUp', component: SignUp},
        {name: 'LogIn', component: LogIn},
        {name: 'OTPVerification', component: OTPVerification},
      ];

  return no_internet ? (
    <No_internet_alert />
  ) : splash_screen ? (
    <Splash_screen />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        {stackScreenArray.map(({name, component}, i) => (
          <Stack.Screen name={name} component={component} key={i} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_navigation;
