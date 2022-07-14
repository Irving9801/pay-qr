import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, SignUp} from '../screens';
import Tabs from './tabs';
import Saldo from '../screens/Saldo';
import SignUpChofer from '../screens/SignUpDrive';

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
          <Stack.Screen name="Login" component={Login} />
          {/*Tabs */}
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Saldo" component={Saldo} />
          <Stack.Screen name="Registertwo" component={SignUpChofer} />
        </Stack.Navigator>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;