import React, { useEffect, useRef } from 'react';

import { Text, View, StyleSheet, Image } from 'react-native';
import walletimg from './walletimg.png';
import Axios from 'axios';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
const Saldo = () => {
  const [saldo, setSaldo] = React.useState();
  const { token, _id, typeUser } = useSelector(
    state => state.userReducer.userInfo,
  );
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      getDataProfile();
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  const getDataProfile = async () => {
    if (typeUser === 'ESTD') {
      Axios.get(`https://ws-production-b7ca.up.railway.app/api/buy/${_id}`)
        .then(response => {
          const { data } = response;
          setSaldo(data[0]);
        })
        .catch(error => { });
    } else {
      Axios.get(
        `https://ws-production-b7ca.up.railway.app/api/trans/rut/${_id}`,
      )
        .then(response => {
          const { data } = response;
          const sumall = data
            .map(item => parseFloat(item.pago))
            .reduce((prev, curr) => prev + curr, 0);
          setSaldo(sumall);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  return (
    <View style={{ height: '100%', backgroundColor: '#F5F8FF' }}>
      <View style={styles.headerbar}>
        <Text style={{ fontSize: 25, fontWeight: '500' }}>Saldo</Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View style={styles.container2}>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  color={COLORS.primary}
                  style={{ height: 40, width: 40 }}
                  source={walletimg}></Image>
                <Text style={{ color: '', fontWeight: 'bold', marginLeft: 10 }}>
                  Balance total
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: COLORS.primary }}>USD</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 30, marginLeft: 5, color: '#ADB7C3' }}>
                $ {saldo?.Saldo ? saldo?.Saldo : saldo}
              </Text>
            </View>
            <Text style={{ marginTop: 5, color: '', fontSize: 20 }}>
              {saldo?.namePlane}
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
    shadowOffset: { width: 0, height: 2 },
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
  headerbar: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
