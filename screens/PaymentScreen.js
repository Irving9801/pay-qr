import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import {
  CardFieldInput,
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../constants';

export default function PaymentScreen({navigation}) {
  const {confirmPayment} = useStripe();
  const {selectedData} = useSelector(state => state.getPlane);
  const {token, _id} = useSelector(state => state.userReducer.userInfo);
  const [saveCard, setSaveCard] = useState(false);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Ha ocurrido un error 😥',
    });
  };
  const showToastSucces = () => {
    Toast.show({
      type: 'success',
      text1: 'Felicidades',
      text2: 'Plan comprado correctamente 🥰',
    });
  };
  const handlePayPress = async () => {
    // 1. fetch Intent Client Secret from backend
    const clientSecret =
      'pi_1DrNBJ2eZvKYlo2CXQCh5Pwi_secret_9J35eTzWlxVmfbbQhmkNbewuL';

    // 2. Gather customer billing information (ex. email)
    const billingDetails: BillingDetails = {
      email: 'email@stripe.com',
      phone: '+48888000888',
      address: {
        city: 'Houston',
        country: 'US',
        line1: '1459  Circle Drive',
        line2: 'Texas',
        postalCode: '77063',
      },
    }; // mocked data for tests

    // 3. Confirm payment with card details
    // The rest will be done automatically using webhooks
    const {error, paymentIntent} = await confirmPayment(
      clientSecret,
      {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      },
      {
        setupFutureUsage: saveCard ? 'OffSession' : undefined,
      },
    );

    if (error) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
                user:_id,
                planId: data._id,
                namePlane: data.namePlane,
                Saldo: data.price,
              },
              config,
            )
              .then(response => {
                const {data} = response;
                if (data) {
                  showToastSucces();
                  setTimeout(() => {
                    navigation.navigate('Home');
                  }, 3000);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(error => {
          console.error(error);
          showToast();
        });
    } else if (paymentIntent) {
      Alert.alert(
        'Success',
        `The payment was confirmed successfully! currency: ${paymentIntent.currency}`,
      );
      console.log('Success from promise', paymentIntent);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerbar}>
        <Text style={{fontSize: 25, fontWeight: '500'}}>Pagar plan</Text>
      </View>
      <CardField
        postalCodeEnabled={false}
        autofocus
        placeholders={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM|YY',
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
        cardStyle={inputStyles}
        style={styles.cardField}
      />
      <View style={styles.row}>
        <Switch onValueChange={value => setSaveCard(value)} value={saveCard} />
        <Text style={styles.text}>Guardar tarjeta durante el pago</Text>
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
          onPress={handlePayPress}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    marginLeft: 12,
  },
  input: {
    height: 44,
    borderBottomColor: '#A020F0',
    borderBottomWidth: 1.5,
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
const inputStyles = (CardFieldInput.Styles = {
  borderWidth: 1,
  backgroundColor: '#FFFFFF',
  borderColor: '#000000',
  borderRadius: 8,
  fontSize: 14,
  placeholderColor: '#A020F0',
  textColor: '#0000ff',
});
