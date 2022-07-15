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
import {StyleSheet,LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import {Provider} from 'react-redux';
import store from './config/store';
import Saldo from './screens/Saldo';
import ProfileScreen from './screens/ProfileScreen';
import UserOrAdmin from './screens/UserOrAdmin';
import Toast from 'react-native-toast-message';
import PaymentScreenMain from './screens/PaymentScreen';
import SignUpChofer from './screens/SignUpDrive';
import Scan from './screens/Scan';
import EditInfo from './screens/EditInfo';
import Movent from './screens/movimientos';
import {StripeProvider} from '@stripe/stripe-react-native';

const Stack = createStackNavigator();
const App = () => {
  const publishableKey =
    'pk_test_51KMLZHK1KltjpGo38RXv3AmA9jEw8W0DfdZGe9L5Y4nFLUk6tJE33TeCIXAJ8ITCFrLG5bdvfAKXbDKMvwzhdliE00ITXo6qeu';
  return (
    <React.StrictMode>
      <Provider store={store}>
        <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier">
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={'Login'}>
              <Stack.Screen name="Registerone" component={SignUp} />
              <Stack.Screen name="EditInfo" component={EditInfo} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Scan" component={Scan} />
              <Stack.Screen name="Home" component={Tabs} />
              <Stack.Screen name="Saldo" component={Saldo} />
              <Stack.Screen name="User" component={ProfileScreen} />
              <Stack.Screen name="Payment" component={PaymentScreenMain} />
              <Stack.Screen name="userOrAdmin" component={UserOrAdmin} />
              <Stack.Screen name="Registertwo" component={SignUpChofer} />
              <Stack.Screen name="move" component={Movent} />
            </Stack.Navigator>
          </NavigationContainer>
        </StripeProvider>
      </Provider>
      <Toast />
    </React.StrictMode>
  );
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'grey',
  },
});
export default App;
