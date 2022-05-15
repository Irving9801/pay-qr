import React from 'react';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native-svg';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
const Home = () => {
  const specialPromoData = [
    {
      id: 1,
      img: images.promoBanner,
      title: 'Bonus Cashback1',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 2,
      img: images.promoBanner,
      title: 'Bonus Cashback2',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 3,
      img: images.promoBanner,
      title: 'Bonus Cashback3',
      description: "Don't miss it. Grab it now!",
    },
    {
      id: 4,
      img: images.promoBanner,
      title: 'Bonus Cashback4',
      description: "Don't miss it. Grab it now!",
    },
  ];
  const [specialPromos, setSpecialPromos] = React.useState(specialPromoData);
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', marginVertical: SIZES.padding * 2}}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h1}}>Bienvenido!</Text>
          <Text style={{...FONTS.body2, color: COLORS.gray}}>
            Irving Vasquez
          </Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray,
            }}>
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                height: 10,
                width: 10,
                backgroundColor: COLORS.red,
                borderRadius: 5,
              }}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderBanner() {
    return (
      <View
        style={{
          height: 120,
          borderRadius: 20,
        }}>
        <Image
          source={images.banner}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
          }}
        />
      </View>
    );
  }

  function renderPromos() {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
      </View>
    );
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={images.promoBanner}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
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
          <Text style={{...FONTS.h4}}>{item.title}</Text>
          <Text style={{...FONTS.body4}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={specialPromos}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{marginBottom: 80}}></View>}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.fondo}}>
      {renderPromos()}
    </SafeAreaView>
  );
};
export default Home;
