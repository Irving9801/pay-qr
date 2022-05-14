/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SignUp} from './screens';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import Login from './screens/Login';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};
const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
    <Login/>
  </SafeAreaView>
);
};
    
  /*  <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>*/

 const styles = StyleSheet.create({
   root:{
     backgroundColor:'grey',
   }
 })
export default App;
