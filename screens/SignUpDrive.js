import {Formik} from 'formik';
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import {INITAL_DATA_LOGIN} from '../store/redux/mainReducer';

const SignUpChofer = ({navigation}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  const [ruta, setRuta] = React.useState();
  const [fileUri, setUri] = React.useState(null);
  const dispatch = useDispatch();
  const [company, setCompany] = React.useState();
  const [companys, setCompanys] = React.useState();
  const [rutas, setRutas] = React.useState();
  console.log(rutas, companys);
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      getDataRutas();
      getCompany();
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });
  const getDataRutas = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/ruta`)
      .then(response => {
        const {data} = response;
        let results = [];
        for (var i = 0; i < data.products.length; i++) {
          results[[i]] = data.products[i].nameRuta;
        }
        setRutas(results);
      })
      .catch(error => {
        console.error(error);
        // showToast();
      });
  };
  const getCompany = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/company`)
      .then(response => {
        const {data} = response;
        let results = [];
        for (var i = 0; i < data.products.length; i++) {
          results[[i]] = data.products[i].name;
        }
        setCompanys(results);
      })
      .catch(error => {
        console.error(error);
        // showToast();
      });
  };
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log('Sign Up')}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />

        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          Registrarse
        </Text>
      </TouchableOpacity>
    );
  }
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };
  const handleRegister = async values => {
    Axios.post(`https://ws-production-b7ca.up.railway.app/api/users`, {
      name: values.name,
      identity: values.identity,
      phone: values.phone,
      password: values.password,
      email: values.email.toLowerCase(),
      Ruta: ruta,
      company: company,
      typeUser: 'CHOFER',
      profile: fileUri,
    })
      .then(response => {
        const {data} = response;

        if (data.token) {
          navigation.navigate('Home');
        }
        dispatch({
          type: INITAL_DATA_LOGIN,
          payload: data,
        });
      })
      .catch(error => {
        showToast();
      });
  };
  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setUri(response.assets[0].uri);
      }
    });
  };
  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return <Text></Text>;
    }
  };
  function renderForm() {
    return (
      <Formik
        initialValues={{
          name: '',
          identity: '',
          phone: '',
          password: '',
          email: '',
        }}
        onSubmit={values => handleRegister(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View
            style={{
              marginTop: SIZES.padding * 3,
              marginHorizontal: SIZES.padding * 3,
            }}>
            {/* Full Name */}
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Nombre completo
              </Text>
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Introduzca nombre completo..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Número de identificación
              </Text>
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Introduzca número de cédula..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                onChangeText={handleChange('identity')}
                onBlur={handleBlur('identity')}
                value={values.identity}
              />
            </View>
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Correo electrónico
              </Text>
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Introduzca su correo electrónico..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Ruta
              </Text>
              <SelectDropdown
                defaultButtonText="Selecciona una ruta"
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={rutas}
                onSelect={(selectedItem, index) => {
                  setRuta(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Compañías
              </Text>
              <SelectDropdown
                defaultButtonText="Selecciona una compañía"
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={companys}
                onSelect={(selectedItem, index) => {
                  setCompany(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            {/* Phone Number */}
            <View style={{marginTop: SIZES.padding * 2}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Número de teléfono
              </Text>

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={{
                    flex: 1,
                    marginVertical: SIZES.padding,
                    borderBottomColor: COLORS.white,
                    borderBottomWidth: 1,
                    height: 40,
                    color: COLORS.white,
                    ...FONTS.body3,
                  }}
                  placeholder="Introduzca número de teléfono..."
                  placeholderTextColor={COLORS.white}
                  selectionColor={COLORS.white}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </View>
            </View>

            {/* Password */}
            <View style={{marginTop: SIZES.padding * 2}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Contraseña
              </Text>
              <TextInput
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.white,
                  borderBottomWidth: 1,
                  height: 40,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
                placeholder="Introduzca la contraseña..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 10,
                  height: 30,
                  width: 30,
                }}
                onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={showPassword ? icons.disable_eye : icons.eye}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: SIZES.padding * 2}}>
              <View>{renderFileUri()}</View>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Adjunta tu foto de perfil
              </Text>
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={chooseImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Seleccionar imagen</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{margin: SIZES.padding * 3}}>
              <TouchableOpacity style={styles.signIn} onPress={handleSubmit}>
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
                    Continuar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.lime, COLORS.emerald]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderForm()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUpChofer;
const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dropdown1BtnTxtStyle: {color: COLORS.white, textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
