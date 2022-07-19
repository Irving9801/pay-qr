import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {FONTS} from '../constants';

const BoxItemTopProduct = ({bgColor, icon, text, price, onPress}) => {
  console.log(icon);
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <View style={{top: -40}}>
        <View>
          <Image source={icon} style={styles.image} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItemTopProduct;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 160,
    width: 150,
    backgroundColor: bgColor,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 40,
  }),
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.Medium,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  wrapperButtom: {
    fontSize: 18,
    fontFamily: FONTS.Medium,
  },
  image: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
    marginLeft: 20,
  },
});
