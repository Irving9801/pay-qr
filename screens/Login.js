import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../assets/images/Logo.png';
import CustomInput from '../components/CustomInput';
import CustomButtom from '../components/CustomButton/CustomButton';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
  const onSignInPressed = () => {
    console.warn('Sign In');
  };
  const onForgotPasswordPressed = () => {
    console.warn('onForgotPasswordPressed');
  };
  const onSignInFacebok = () => {
    console.warn('Facebook');
  };
  const onSignInGoogle = () => {
    console.warn('Google');
  };
  const onSignOnPress = () => {
    console.warn('onSignOnPress');
  };
  return (
    /**LOGO */
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButtom text="Sign In" onPress={onSignInPressed} />
        <CustomButtom text="Forgot Password" type="TERTIARY" />

        <CustomButtom
          text="Sign In with Facebook"
          bgColor="#FAE9EA"
          fgColor="#DD4D44"
        />
        <CustomButtom
          text="Sign In with Google"
          bgColor="#e3e3e3"
          fgColor="#363636"
        />
        <CustomButtom
          text="Dont have an acount? Create one"
          onPress={onSignOnPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    height: 110,
  },
});

export default Login;
