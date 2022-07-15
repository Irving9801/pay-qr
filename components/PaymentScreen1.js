import {initStripe} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';

const PaymentScreen =
  ({props}) =>
  ({paymentMethod, children, onInit}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function initialize() {
        const publishableKey =
          'pk_test_51KMLZHK1KltjpGo38RXv3AmA9jEw8W0DfdZGe9L5Y4nFLUk6tJE33TeCIXAJ8ITCFrLG5bdvfAKXbDKMvwzhdliE00ITXo6qeu';
        if (publishableKey) {
          await initStripe({
            publishableKey,
            merchantIdentifier: 'merchant.com.stripe.react.native',
            urlScheme:
              paymentMethod === 'wechat_pay' ? undefined : 'stripe-example',
            setReturnUrlSchemeOnAndroid: true,
          });
          setLoading(false);
          onInit?.();
        }
      }
      initialize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
      <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
      <ScrollView
        accessibilityLabel="payment-screen"
        style={styles.container}
        keyboardShouldPersistTaps="always">
        {children}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{opacity: 0}}>appium fix</Text>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreen;
