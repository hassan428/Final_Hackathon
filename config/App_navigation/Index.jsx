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

const App_navigation = () => {
  const [splash_screen, setSplash_screen] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('Welcome');
  const {islogged} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const splashOffHandle = () =>
    setTimeout(() => {
      setSplash_screen(false);
    }, 3000);

  const auth_check_handle = async () => {
    try {
      const res = await api_auth_check();
      console.log('res', res.data);
      dispatch(profile_action(res.data.data));
      dispatch(islogged_action(true));
      splashOffHandle();
    } catch (error) {
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
        {name: 'NewPassword', component: NewPassword},
        {name: 'Create_team', component: Create_team},
        {name: 'Add_task', component: Add_task},
      ]
    : [
        {name: 'Welcome', component: Welcome},
        {name: 'First_screen', component: First_screen},
        {name: 'Second_screen', component: Second_screen},
        {name: 'Third_screen', component: Third_screen},
        {name: 'SignUp', component: SignUp},
        {name: 'LogIn', component: LogIn},
        {name: 'OTPVerification', component: OTPVerification},
        {name: 'NewPassword', component: NewPassword},
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
