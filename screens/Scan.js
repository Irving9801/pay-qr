import React, {useState, useEffect, useRef} from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Button,
  Linking,
  Image,
  Modal,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
const Scan = () => {
  const [price, setPrice] = useState();
  const {token, _id} = useSelector(state => state.userReducer.userInfo);
  const [university, setUniversity] = useState('');
  const {profileData} = useSelector(state => state.getPlane);

  const [index, setIndex] = useState();
  const [rutas, setRuta] = useState();
  const [visible, setVisible] = useState(false);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      getDataRutas();
      getDataProfile();
      mounted.current = true;
    }
  });

  const [move, setMove] = React.useState();
  const getDataProfile = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/buy/${_id}`)
      .then(response => {
        const {data} = response;
        setMove(data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getDataRutas = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/ruta`)
      .then(response => {
        const {data} = response;
        let results = [];
        for (var i = 0; i < data.products.length; i++) {
          results[[i]] = data.products[i].nameRuta;
        }
        let price = [];
        for (var i = 0; i < data.products.length; i++) {
          price[[i]] = data.products[i].price;
        }
        setPrice(price);
        setRuta(results);
      })
      .catch(error => {
        console.error(error);
        // showToast();
      });
  };
  const [qr, setQr] = useState([]);
  const generateCode = () => {
    setVisible(true);
    const payload = [
      {
        prec: price[index],
        idUser: _id,
        buy: move?._id,
      },
    ];
    setQr(payload);
  };
  const createTrans = async () => {
    setVisible(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2QyNzQyYmRmZDk0YWQ1ZDY3NWUzMiIsImlhdCI6MTY1NzY3ODQ0MSwiZXhwIjoxNjYwMjcwNDQxfQ.YTBfdMbm9JBmA3X1eqhXGHGkYnSenXrQZzvqQQl0cNM`,
      },
    };
    Axios.get(
      `https://ws-production-b7ca.up.railway.app/api/buy/${scandata[1]}`,
    )
      .then(response => {
        const {data} = response;
        setMove(data[0]);

        Axios.put(
          `https://ws-production-b7ca.up.railway.app/api/buy/${scandata[2]}`,
          {
            user: data[0]?.user,
            Saldo: data[0]?.Saldo - scandata[0],
            namePlane: data[0]?.namePlane,
            planId: data[0]?.planId,
          },
        )
          .then(response => {
            const {data} = response;
            if (data) {
              Axios.post(
                `https://ws-production-b7ca.up.railway.app/api/trans`,
                {
                  user: scandata[1],
                  pago: scandata[0],
                  toUser: _id,
                },
                config,
              )
                .then(response => {
                  const {data} = response;
                  setShowModal(true);
                  console.log(data);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
    // getPlane.selectedData
  };
  const [scandata, setScan] = useState();
  const onSuccess = e => {
    let arr = e.data.split(',');
    setScan(arr);
  };

  function renderPaymentMethods() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 320,
          padding: SIZES.padding * 3,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}>
        <Text style={{...FONTS.h3}}>Detalle</Text>
        <Text style={styles.centerText}>
          Monto a pagar por el usuario: ${scandata ? scandata[0] : null}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: SIZES.padding * 2,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 20,
            }}
            onPress={createTrans}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.primary]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.white,
                  },
                ]}>
                Realizar cobro
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <View style={styles.modal1}>
          <Text style={styles.text1}>Transaccion completada!</Text>
          <Lottie
            source={require('./../assets/lottie/46848-transaction-completed.json')}
            autoPlay
            loop
          />
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              setShowModal(!showModal);
            }}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.primary]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.white,
                  },
                ]}>
                Regresar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>

      {profileData?.typeUser === 'CHOFER' ? (
        <View style={{flex: 1, backgroundColor: COLORS.transparent}}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
              <Text style={styles.centerText}>
               
                <Text style={styles.textBold}></Text>
              
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }></QRCodeScanner>
          {renderPaymentMethods()}
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              Selecciona tu ruta y utiliza el QR generado para pagar tu pasaje
            </Text>
            <SelectDropdown
              defaultButtonText="Selecciona una universidad"
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              data={rutas}
              onSelect={(selectedItem, index) => {
                setUniversity(selectedItem);
                setIndex(index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            {university && visible ? (
              <>
                <QRCode
                  value={`${qr[0]?.prec},${qr[0]?.idUser},${move?._id}`}
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
                <Text style={styles.textStyle}>
                  Monto a pagar ${qr[0]?.prec}
                </Text>
              </>
            ) : null}

            <TouchableOpacity style={styles.buttonStyle} onPress={generateCode}>
              <Text style={styles.buttonTextStyle}>
                Generar codigo para pagar
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Scan;
const styles = StyleSheet.create({
  //Style qr
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    padding: 100,
  },
  text1: {
    color: '#3f2949',
    marginTop: 0,
    marginBottom: 10,
  },
  //
  scrollView: {
    backgroundColor: '#334543',
  },
  body: {
    backgroundColor: '#334543',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#334543',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#334543',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#334543',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 1,

    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  dropdown1BtnTxtStyle: {color: COLORS.white, textAlign: 'left'},
  dropdown1BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
    bottom: 30,
  },
  buttonTouchable: {
    padding: 16,
  },
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
    margin: 50,
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
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: COLORS.primary,
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
