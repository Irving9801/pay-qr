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
import { PROFILE_DATA } from '../store/redux/mainReducer';
const ProfileScreen = ({navigation}) => {
  const mounted = useRef();
  const [profile, setProfile] = React.useState();

  useEffect(() => {
    if (!mounted.current) {
      getDataProfile();
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };
  const dispatch = useDispatch();
  const getDataProfile = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2QyNzQyYmRmZDk0YWQ1ZDY3NWUzMiIsImlhdCI6MTY1NzY3ODQ0MSwiZXhwIjoxNjYwMjcwNDQxfQ.YTBfdMbm9JBmA3X1eqhXGHGkYnSenXrQZzvqQQl0cNM`,
      },
    };
    Axios.get(
      `https://ws-production-b7ca.up.railway.app/api/users/62cd2742bdfd94ad5d675e32`,
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
          <Icon name="rocket" size={30} color="#900" />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {profile?.company}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {' '}
              {profile?.phone}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
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
            <Title>15$</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Tarjeta</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate("EditInfo")}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Editar informacion</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
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
