import React, {useEffect, useState} from 'react';
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
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import ListItem from '../components/lisItem';
import results from './results';

const AddU = ({navigation, item}) => {
  console.log(navigation);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };

  const {token, _id} = useSelector(state => state.userReducer.userInfo);
  const handleRegister = async values => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    Axios.post(
      `https://ws-production-b7ca.up.railway.app/api/university`,
      {
        name: values.name,
      },
      config,
    )
      .then(response => {
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        showToast();
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
        onPress={() => navigation.navigate('goBack')}>
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
          Regresar
        </Text>
      </TouchableOpacity>
    );
  }
  const [view, setView] = useState(false);
  const onhandleViwe = () => {
    setView(true);
  };

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  useEffect(() => {
    if (searchText === '') {
      setList(results);
    } else {
      setList(
        results.filter(
          item =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        ),
      );
    }
  }, [searchText]);

  const handleList = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/university`)
      .then(response => {
        console.log(response.data.products);
        setList(response.data.products);
      })
      .catch(error => {
        console.log(error);
        showToast();
      });
  };
  function ListU() {
    return (
      <SafeAreaView style={styles.container2}>
        <FlatList
          data={list}
          style={styles.list}
          renderItem={({item}) => <ListItem data={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
  function renderForm() {
    return (
      <Formik
        initialValues={{
          name: '',
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
                Nombre de universidad
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
                placeholder="Agregar universidad..."
                placeholderTextColor={COLORS.white}
                selectionColor={COLORS.white}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
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
                    Agregar
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                onhandleViwe(), handleList();
              }}>
              <Icon name="list-ol" size={30} color={COLORS.white} />
              <Text>Listar universidades</Text>
            </TouchableOpacity>
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
          {view ? ListU() : renderForm()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AddU;
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  list: {
    flex: 1,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.white,
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
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  dropdown1BtnTxtStyle: {color: COLORS.white, textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});
