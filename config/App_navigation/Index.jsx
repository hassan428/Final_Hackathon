import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SignUp} from '../../Screens/SignUp';
import {LogIn} from '../../Screens/LogIn';
import {BottomTabs} from '../../Screens/BottomTabs';
import {Welcome} from '../../Screens/Welcome';
import {useDispatch, useSelector} from 'react-redux';
import {Splash_screen} from '../../Screens/Splash_screen';
import {Loading} from '../../component/Loading';
import {First_screen} from '../../Screens/First_screen';
import {Second_screen} from '../../Screens/Second_screen';
import {Third_screen} from '../../Screens/Third_screen';

const App_navigation = () => {
  const [splash_screen, setSplash_screen] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('BottomTabs');
  const {islogged, loading} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // check auth APIs
    // initialRouteName('BottomTabs')
    setTimeout(() => {
      setSplash_screen(false);
    }, 3000);
  }, []);

  const Stack = createNativeStackNavigator();
  const stackScreenArray = [
    {name: 'BottomTabs', component: BottomTabs},
    {name: 'Welcome', component: Welcome},
    {name: 'First_screen', component: First_screen},
    {name: 'Second_screen', component: Second_screen},
    {name: 'Third_screen', component: Third_screen},
    {name: 'SignUp', component: SignUp},
    {name: 'LogIn', component: LogIn},
  ];
  // const stackScreenArray = islogged
  //   ? [{name: 'BottomTabs', component: BottomTabs}]
  //   : [
  //       {name: 'Welcome', component: Welcome},
  //       {name: 'SignUp', component: SignUp},
  //       {name: 'LogIn', component: LogIn},
  //     ];

  return splash_screen ? (
    <Splash_screen />
  ) : loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        {stackScreenArray.map(({name, component}, i) => (
          <Stack.Screen name={name} component={component} key={i} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App_navigation;
