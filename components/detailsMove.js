import * as React from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, icons} from '../constants';
import {CustomCard} from './CustomCard';

export const DetailsMove = props => {
  const {token, _id, typeUser} = useSelector(
    state => state.userReducer.userInfo,
  );
  let {pago, createdAt, actualbalance, decreased, saldo, difference, imgsrc} =
    props.item;

  return (
    <Pressable onPress={props.onPress}>
      <CustomCard
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 15,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <View>
          <Image style={{height: 60, width: 60}} source={icons.dollar}></Image>
        </View>
        <View style={{flex: 2, marginLeft: 15, marginRight: 8}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '600', color: COLORS.primary}}>
              $ {pago}
            </Text>
            <Text>{actualbalance}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: COLORS.primary, fontWeight: '600'}}>
              {createdAt}
            </Text>
            {typeUser === 'ESTD' ? (
              <Text
                style={{
                  color: COLORS.red,
                  fontWeight: '600',
                }}>
                Pagos
              </Text>
            ) : (
              <Text
                style={{
                  color: COLORS.green,
                  fontWeight: '600',
                }}>
                Cobros
              </Text>
            )}
          </View>
        </View>
      </CustomCard>
    </Pressable>
  );
};
