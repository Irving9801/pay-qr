import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions} from 'react-native';
import {DetailsMove} from '../components/detailsMove';
import Axios from 'axios';
import { useSelector } from 'react-redux';
const Movimientos = () => {
  const mounted = useRef();
  const {token,_id} = useSelector(state => state.userReducer.userInfo);
  useEffect(() => {
    if (!mounted.current) {
      getDataProfile();
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });
  const [move, setMove] = React.useState();
  //   http://localhost:5000/api/trans
  const getDataProfile = async () => {
    Axios.get(`https://ws-production-b7ca.up.railway.app/api/trans/${_id}`)
      .then(response => {
        const {data} = response;
        console.log(data,"MAMA");
        setMove(data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={{height: '100%', backgroundColor: '#F5F8FF'}}>
      <View style={styles.headerbar}>
        <Text style={{fontSize: 25, fontWeight: '500'}}>Mis movimientos</Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 10,
            backgroundColor: '#F5F8FF',
            overflow: 'hidden',
            marginBottom: 100,
          }}>
          <FlatList
            data={move}
            style={{height: Dimensions.get('window').height / 2 - 0}}
            ItemSeparatorComponent={() => (
              <View style={{marginVertical: 8}}></View>
            )}
            renderItem={({item}) => <DetailsMove item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};
export default Movimientos;
const styles = StyleSheet.create({
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
  filters: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    left: 1,
    right: 1,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
});
