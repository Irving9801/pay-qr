import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {keys} from './keys';
import {
  ApplePayButton,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../constants';

export default function PaymentScreen() {
  const {confirmPayment} = useStripe();
  const {selectedData} = useSelector(state => state.getPlane);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };
  const buyPlan = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2QyNzQyYmRmZDk0YWQ1ZDY3NWUzMiIsImlhdCI6MTY1NzY3ODQ0MSwiZXhwIjoxNjYwMjcwNDQxfQ.YTBfdMbm9JBmA3X1eqhXGHGkYnSenXrQZzvqQQl0cNM`,
      },
    };
    // getPlane.selectedData
    Axios.get(
      `https://ws-production-b7ca.up.railway.app/api/planes/${selectedData}`,
    )
      .then(response => {
        const {data} = response;
        if (data) {
          Axios.post(
            `https://ws-production-b7ca.up.railway.app/api/buy`,
            {
              planId: data._id,
              namePlane: data.namePlane,
              Saldo: data.price,
            },
            config,
          ).then(response => {
            const {data} = response;
            console.log(data);
          }).catch(err => {console.log(err)});

        }
        console.log(data);
        // setProfile(data);
        // dispatch({
        //   type: PROFILE_DATA,
        //   payload: data,
        // });
      })
      .catch(error => {
        console.error(error);
        showToast();
      });
  };
  return (
    <View>
      <Text>Hola</Text>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <View style={{margin: SIZES.padding * 3}}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={buyPlan}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
