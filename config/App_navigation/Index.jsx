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
import {islogged_action, profile_action} from '../../store/slices/auth_slice';
import {NewPassword} from '../../Screens/NewPassword';
import {Create_team} from '../../Screens/Create_team';
import {Add_task} from '../../Screens/Add_task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {_id_name, dark_mode_key} from '../../utils/constants';
import {Settings} from '../../Screens/Setting';
import {set_dark_mode} from '../../store/slices/theme_slice';
import {Edit_profile} from '../../Screens/Edit_profile';

const App_navigation = () => {
  const [splash_screen, setSplash_screen] = useState(true);
  const {islogged} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const splashOffHandle = () =>
    setTimeout(() => {
      setSplash_screen(false);
    }, 3000);

  const auth_check_handle = async () => {
    let value = await AsyncStorage.getItem(dark_mode_key);
    value = JSON.parse(value);
    // console.log('value', value);
    dispatch(set_dark_mode(value));

    try {
      const res = await api_auth_check();
      console.log('res', res.data);
      dispatch(profile_action(res.data.data));
      dispatch(islogged_action(true));
      splashOffHandle();
    } catch (error) {
      await AsyncStorage.removeItem(_id_name);
      splashOffHandle();
      console.log('error', error);
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
        {name: 'Edit_profile', component: Edit_profile},
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

  return splash_screen ? (
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
