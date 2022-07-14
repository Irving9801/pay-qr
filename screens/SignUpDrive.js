import {Formik} from 'formik';
import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {COLORS, SIZES, FONTS, icons, images} from '../constants';
import { INITAL_DATA_LOGIN } from '../store/redux/mainReducer';

const SignUpChofer = ({navigation}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
  const [ruta, setRuta] = React.useState();
  const dispatch = useDispatch();
  const [company, setCompany] = React.useState();

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
        console.log(error);
        showToast();
      });
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
                Numero de identificacion
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
                placeholder="Introduzca numero de cedula..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                onChangeText={handleChange('identity')}
                onBlur={handleBlur('identity')}
                value={values.identity}
              />
            </View>
            <View style={{marginTop: SIZES.padding * 3}}>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Correo electronico
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
                placeholder="Introduzca su correo electronico..."
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
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={countries}
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
                Compania
              </Text>
              <SelectDropdown
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={countries}
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
            <View style={{margin: SIZES.padding * 3}}>
              <TouchableOpacity
                style={{
                  height: 60,
                  backgroundColor: COLORS.black,
                  borderRadius: SIZES.radius / 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleSubmit}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>
                  Continuar
                </Text>
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
  dropdown1BtnTxtStyle: {color: COLORS.white, textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
