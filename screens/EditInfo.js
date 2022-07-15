import React, {useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {COLORS, SIZES, FONTS} from '../constants';
import {INITAL_DATA_LOGIN} from '../store/redux/mainReducer';
const EditInfo = ({navigation}) => {
  const dispatch = useDispatch();
  const [qrvalue, setQrvalue] = useState('');
  const [fileUri, setUri] = React.useState(null);
  const [fileUriPerfil, setUriPerfil] = React.useState(null);
  const {profileData} = useSelector(state => state.getPlane);
  const [universidad, setUniversity] = React.useState();
  const {token} = useSelector(state => state.userReducer.userInfo);
  const universidades = [
    'Universidad tecnologica de panama',
    'Universidad de panama',
    'Universidad latina',
  ];
  const handleRegister = async values => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    Axios.put(
      `https://ws-production-b7ca.up.railway.app/api/users/${profileData._id}`,
      {
        _id: profileData._id,
        name: values.name,
        identity: values.identity,
        phone: values.phone,
        email: values.email,
        Ruta: null,
        company: universidad,
        typeUser: 'ESTD',
        profile: fileUri,
        carnet: fileUriPerfil,
      },
      config,
    )
      .then(response => {
        const {data} = response;

        if (data) {
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
  const renderFileUri = () => {
    if (fileUri || profileData.profile) {
      return (
        <Image
          source={{uri: fileUri || profileData.profile}}
          style={styles.images}
        />
      );
    } else {
      return <Text></Text>;
    }
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
  const renderFilePerfil = () => {
    if (fileUriPerfil || profileData.carnet) {
      return (
        <Image
          source={{uri: fileUriPerfil || profileData.carnet}}
          style={styles.images}
        />
      );
    } else {
      return <Text></Text>;
    }
  };
  const choosePerfil = () => {
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
        setUriPerfil(response.assets[0].uri);
      }
    });
  };
  return (
    <ScrollView style={{backgroundColor: COLORS.primary}}>
      <Formik
        initialValues={{
          name: profileData.name,
          identity: profileData.identity,
          phone: profileData.phone,
          email: profileData.email,
          profile: profileData.profile,
          carnet: profileData.carnet,
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
                Universidad
              </Text>
              <SelectDropdown
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={universidades}
                defaultValue={profileData.company}
                onSelect={(selectedItem, index) => {
                  setUniversity(selectedItem);
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
            <View style={{marginTop: SIZES.padding * 2}}>
              <View>{renderFileUri()}</View>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Actualiza tu foto de perfil
              </Text>
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={chooseImage}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Seleccionar imagen</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: SIZES.padding * 2}}>
              <View>{renderFilePerfil()}</View>
              <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
                Actualiza tu foto de carnet
              </Text>
              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={choosePerfil}
                  style={styles.btnSection}>
                  <Text style={styles.btnText}>Seleccionar imagen</Text>
                </TouchableOpacity>
              </View>
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
                  Actualizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default EditInfo;
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
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
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
  dropdown1BtnTxtStyle: {color: COLORS.white, textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
