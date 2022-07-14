import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
const Scan = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const qr = '2';
  const pae = 1;
  console.log(qr > pae)
  const createTrans = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2QyNzQyYmRmZDk0YWQ1ZDY3NWUzMiIsImlhdCI6MTY1NzY3ODQ0MSwiZXhwIjoxNjYwMjcwNDQxfQ.YTBfdMbm9JBmA3X1eqhXGHGkYnSenXrQZzvqQQl0cNM`,
      },
    };
    // getPlane.selectedData
    if (qr > pae) {
      const showToast = () => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Lo sentimos, tu saldo es inferior al monto a pagar 😥',
        });
      };
      showToast();
    } else {
      Axios.post(
        `https://ws-production-b7ca.up.railway.app/api/trans`,
        {
          user: '62cd2742bdfd94ad5d675e32',
          pago: pae,
          toUser: '62ce3866aff3e2ac5004d82e',
        },
        config,
      )
        .then(response => {
          const {data} = response;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Genera y utiliza el QR generado para pagar tu pasaje
        </Text>
        <QRCode
          value={qr}
          size={250}
          color="black"
          backgroundColor="white"
          logo={{
            url: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
          }}
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
        />
        <Text style={styles.textStyle}>Monto a pagar ${qr}</Text>

        <TouchableOpacity style={styles.buttonStyle} onPress={createTrans}>
          <Text style={styles.buttonTextStyle}>Generar codigo para pagar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Scan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
