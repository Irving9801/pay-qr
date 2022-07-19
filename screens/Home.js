import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {SELECTED_PLANE} from '../store/redux/mainReducer';
import LinearGradient from 'react-native-linear-gradient';
import BoxItemTopProduct from '../components/BoxItemTopProduct';
const Home = ({navigation}) => {
  const mounted = useRef();
  const [visible, setVisible] = React.useState(false);
  const [indexOp, setIndex] = React.useState(0);
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.getPlane?.userGetPlan);
  const {typeUser} = useSelector(state => state.userReducer.userInfo);
  const {profileData} = useSelector(state => state.getPlane);
  const dataTopProducts = [
    {
      name: 'RUTA',
      bgColor: 'rgba(227,206,243,0.5)',
      price: 1.53,
      desc: 'rutas',
      icon: <Icon name="university" size={20} color={COLORS.primary} />,
    },
    {
      name: 'UNIVERSIDAD',
      bgColor: 'rgba(255, 234, 232, 0.5)',
      price: 1.53,
      desc: 'addU',
      icon: <Icon name="university" size={20} color={COLORS.primary} />,
    },
    {
      name: 'PLANES',
      bgColor: 'rgba(187, 208, 136, 0.5)',
      price: 1.53,
      desc: 'add',
    },
    {
      name: 'COMPAÑIA',
      bgColor: 'rgba(187, 208, 136, 0.5)',
      price: 1.53,
      desc: 'company',
    },
  ];
  useEffect(() => {
    if (!mounted.current) {
      setTimeout(() => {
        // getDataProfile();
      }, 2000);

      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  const featuresData = [
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightGreen,
      description: 'Movimientos',
    },
    {
      id: 3,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Saldo',
    },
    {
      id: 4,
      icon: icons.user,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightGreen,
      description: 'Perfil',
    },
  ];
  const featuresData1 = [
    {
      id: 1,
      icon: icons.reload,
      color: COLORS.purple,
      backgroundColor: COLORS.lightGreen,
      description: 'Pagar',
    },
    {
      id: 2,
      icon: icons.send,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightGreen,
      description: 'Movimientos',
    },
    {
      id: 3,
      icon: icons.internet,
      color: COLORS.primary,
      backgroundColor: COLORS.lightGreen,
      description: 'Saldo',
    },
    {
      id: 4,
      icon: icons.user,
      color: COLORS.yellow,
      backgroundColor: COLORS.lightGreen,
      description: 'Perfil',
    },
  ];

  const [specialPromos, setSpecialPromos] = React.useState(products);

  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h1}}>Bienvenido!</Text>
          <Text style={{...FONTS.body2, color: COLORS.gray}}>
            {profileData?.name}
          </Text>
        </View>
      </View>
    );
  }
  const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  function renderFeatures() {
    const Header = () => (
      <View style={{marginBottom: SIZES.padding * 2}}>
        <Text style={{...FONTS.h3}}>Atajos</Text>
      </View>
    );
    const renderItem = ({item}) => (
      (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
            width: 60,
            alignItems: 'center',
          }}
          onPress={() => handlePress(item.description)}>
          <View
            style={{
              height: 50,
              width: 50,
              marginBottom: 5,
              borderRadius: 20,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
                tintColor: item.color,
              }}
            />
          </View>
          <Text style={{textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4}}>
            {item.description}
          </Text>
        </TouchableOpacity>
      )
    );

    return (
      <>
        {typeUser === 'CHOFER' ? (
          <FlatList
            ListHeaderComponent={Header}
            data={featuresData}
            numColumns={4}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            style={{marginTop: SIZES.padding * 2}}
            onPress={e => {
              handlePress(e);
            }}
          />
        ) : (
          <FlatList
            ListHeaderComponent={Header}
            data={featuresData1}
            numColumns={4}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            style={{marginTop: SIZES.padding * 2}}
            onPress={e => {
              handlePress(e);
            }}
          />
        )}
      </>
    );
  }

  const handlePress = e => {
    if (e === 'Saldo') {
      navigation.navigate('Saldo');
    } else if (e === 'Perfil') {
      navigation.navigate('User');
    } else if (e === 'Movimientos') {
      navigation.navigate('move');
    } else if (e === 'Pagar') {
      navigation.navigate('Scan');
    }
  };
  function renderPromos() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderFeatures()}
        {typeUser === 'CHOFER' ? null : renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = () => (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SIZES.padding,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h3}}>Planes disponibles</Text>
        </View>
      </View>
    );

    const renderItem = ({item, index}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={e => {
          setVisible(true), setIndex(index);
        }}>
        <ModalPoup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={icons.close}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: item.color,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{margin: 0, height: '40%'}}>
            <Lottie
              source={require('./../assets/lottie/100548-bus-carga-trackmile.json')}
              autoPlay
              loop
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              height: 60,
            }}>
            {products[indexOp]?.namePlane}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              height: 60,
            }}>
            {products[indexOp]?.descriptionPlane}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              height: 60,
            }}>
            $ {products[indexOp]?.price}
          </Text>
          <TouchableOpacity
            style={styles.signIn}
            onPress={e => {
              setVisible(false),
                navigation.navigate('Payment'),
                dispatch({
                  type: SELECTED_PLANE,
                  payload: products[indexOp]?._id,
                });
            }}>
            <LinearGradient
              colors={[COLORS.secondary, COLORS.primary]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: COLORS.white,
                  },
                ]}>
                Comprar
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ModalPoup>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={images.promoBanner}
            style={{
              marginLeft: 80,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>

        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={{...FONTS.h4}}>{products[index].namePlane}</Text>
          <Text style={{...FONTS.body4}}>
            {products[index].descriptionPlane}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <>
        {typeUser === 'CHOFER' ? (
          <FlatList
            ListHeaderComponent={HeaderComponent}
            data={specialPromos}
            contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
            numColumns={2}
            vc
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => `${item.id}`}
            // renderItem={renderItem}
            onPress={item => ModalInfo(item)}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginBottom: 80}}></View>}
          />
        ) : (
          <FlatList
            ListHeaderComponent={HeaderComponent}
            data={specialPromos}
            contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
            numColumns={2}
            vc
            columnWrapperStyle={{justifyContent: 'space-between'}}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            onPress={item => ModalInfo(item)}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{marginBottom: 80}}></View>}
          />
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {typeUser === 'ADMIN' ? (
        <View>
          <View style={styles.sectionBoxTopProduct}>
            {dataTopProducts.map((item, index) => {
              return (
                <BoxItemTopProduct
                  key={index}
                  bgColor={item.bgColor}
                  text={item.name}
                  icon={item.icon}
                  onPress={() => navigation.navigate(item.desc)}
                />
              );
            })}
          </View>
        </View>
      ) : (
        renderPromos()
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '100%',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperHeadTopProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tittleTopProducts: {
    color: COLORS.primary,
    fontFamily: FONTS.SemiBold,
    fontSize: 20,
  },
  textSeeAll: {
    color: COLORS.black,
    fontFamily: FONTS.Medium,
    fontSize: 12,
  },
  sectionBoxTopProduct: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  /////
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#7CA1B4',
    height: '100%',
    flex: 1,
    alignItems: 'center', // ignore this - we'll come back to it
    justifyContent: 'center', // ignore this - we'll come back to it
    flexDirection: 'column',
  },
  square: {
    backgroundColor: '#7cb48f',
    width: 100,
    height: 100,
    margin: 4,
  },
});
export default Home;
