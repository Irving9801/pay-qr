/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SignUp, Login} from './screens';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import Tabs from './navigation/tabs';
import {Provider} from 'react-redux';
import store from './config/store';
import Saldo from './screens/Saldo';
import MyStack from './navigation/MyStack';
import ProfileScreen from './screens/ProfileScreen';
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
    <React.StrictMode>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={SignUp} />
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Saldo" component={Saldo} />
            <Stack.Screen name="User" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </React.StrictMode>
  );
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'grey',
  },
});
export default App;
