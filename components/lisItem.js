import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants';
const ListItem = ({data}) => {
  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity>
          <View style={styles.itemP1}>
            <AntDesign name="delete" size={30} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.itemP2}>
            <AntDesign name="edit" size={30} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemP1}>
          {data.name || data.nameRuta || data.namePlane}
        </Text>
        <Text style={styles.itemP2}>{data.email || data.price}</Text>
        <Text style={styles.itemP2}>{data.descriptionPlane}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  itemInfo: {
    marginLeft: 20,
  },

  itemP1: {
    fontSize: 22,
    color: COLORS.black,
    marginBottom: 5,
  },
  itemP2: {
    fontSize: 18,
    color: COLORS.black,
  },
});

export default ListItem;
