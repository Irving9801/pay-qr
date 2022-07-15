import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Lottie from 'lottie-react-native';

import {COLORS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
export default function PaymentScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{margin: 0, height: '40%'}}>
        <Lottie
          source={require('./../assets/lottie/38435-register.json')}
          autoPlay
          loop
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => navigation.navigate('Registerone')}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.black]}
            style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: COLORS.white,
                },
              ]}>
              Soy estudiante
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.signIn,
            {
              borderColor: COLORS.lightGreen,
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
          onPress={() => navigation.navigate('Registertwo')}>
          <Text
            style={[
              styles.textSign,
              {
                color: COLORS.white,
              },
            ]}>
            Soy conductor
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    // width: '70%',
    margin: 100,
  },
});
