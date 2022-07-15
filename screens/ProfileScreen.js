import React, {useEffect, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { PROFILE_DATA} from '../store/redux/mainReducer';
import {COLORS} from '../constants';
const ProfileScreen = ({navigation}) => {
  const mounted = useRef();
  const [profile, setProfile] = React.useState();
  const [saldo, setSaldo] = React.useState();
  const {token, _id} = useSelector(state => state.userReducer.userInfo);

  useEffect(() => {
    if (!mounted.current) {
      getDataProfile();
      getDataBuy();
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });
  const reset = () => {
    dispatch({type: "DELETE"});
    navigation.navigate('Login');
  };
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };
  const dispatch = useDispatch();
  const getDataBuy = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/buy/${_id}`)
      .then(response => {
        const {data} = response;
        setSaldo(data[0]);
      })
      .catch(error => {
        console.error(error);
        showToast();
      });
  };
  const getDataProfile = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    Axios.get(
      `https://ws-production-b7ca.up.railway.app/api/users/${_id}`,
      config,
    )
      .then(response => {
        const {data} = response;
        setProfile(data);
        dispatch({
          type: PROFILE_DATA,
          payload: data,
        });
      })
      .catch(error => {
        console.error(error);
        showToast();
      });
  };
  console.log(profile);
  console.log(saldo);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
              source={{
                uri: 'https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                {profile?.name}
              </Title>
              {/* <Caption style={styles.caption}>@ivasquez</Caption> */}
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="university" size={20} color={COLORS.primary} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile?.company}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" size={20} color={COLORS.primary} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {' '}
              {profile?.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="mail-forward" size={20} color={COLORS.primary} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile?.email}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#dddddd',
                borderRightWidth: 1,
              },
            ]}>
            <Title>${saldo?.Saldo}</Title>
            <Caption>Mi saldo</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title> {saldo?.namePlane}</Title>
            <Caption>Plan</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate('EditInfo')}>
            <View style={styles.menuItem}>
              <Icon name="edit" size={25} />
              <Text style={styles.menuItemText}>Editar informacion</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={reset}>
            <View style={styles.menuItem}>
              <Icon name="window-close-o" size={25} />
              <Text style={styles.menuItemText}>Cerrar sesión</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
