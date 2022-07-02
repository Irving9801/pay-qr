import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, SignUp} from '../screens';
import Tabs from './tabs';
import Saldo from '../screens/Saldo';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Login'}>
          <Stack.Screen name="Login" component={SignUp} />
          {/*Tabs */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Saldo" component={Saldo} />
        </Stack.Navigator>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;