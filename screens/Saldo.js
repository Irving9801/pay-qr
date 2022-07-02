import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import walletimg from './walletimg.png';
import QRCode from 'react-native-qrcode-svg';
const Saldo = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const CRYPTOCURRENCIES = [
    {
      id: 1,
      name: 'Bitcoin',
      cryptobalance: '3.5290123123 BTC',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      difference: '$ 5.44',
      decreased: false,
      // imgsrc: bitcoin,
    },
    {
      id: 2,
      name: 'Etherium',
      cryptobalance: '12.5290123123 ETH',
      actualbalance: '$19.53',
      percentage: '+ 4.32%',
      decreased: false,
      difference: '$ 3.44',
      // imgsrc: etherium,
    },
    {
      id: 3,
      name: 'Ripple',
      cryptobalance: '3.5290123123 XRP',
      actualbalance: '$19.53',
      percentage: '- 4.32%',
      decreased: true,
      difference: '$ 7.44',
      // imgsrc: ripple,
    },
  ];
  return (
    <View style={{height: '100%', backgroundColor: '#F5F8FF'}}>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.container2}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 40, width: 40}}
                  source={walletimg}></Image>
                <Text style={{color: '', fontWeight: 'bold', marginLeft: 10}}>
                  Balance total
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#ADB7C3'}}>USD</Text>
                {/* <Ionicons name="chevron-down-outline" size={20} color=""  /> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 30, marginLeft: 5, color: '#ADB7C3'}}>
                $33.212
              </Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: '',
                  height: 25,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>
                  + 3.55%
                </Text>
              </View>
            </View>
            <Text style={{marginTop: 5, color: '', fontSize: 20}}>
              7.2131231
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Saldo;
const styles = StyleSheet.create({
  container2: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 10,
  },
  container: {
    shadowColor: '#ADB7C3',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 1,
  },
  filters: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    left: 1,
    right: 1,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
});
