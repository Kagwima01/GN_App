//react native
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';

//react
import {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//components
import OutItem from '../components/OutItem';
import Heading from '../components/Heading';
import {COLORS, SIZES} from '../constants';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {getOutOfStock} from '../redux/actions/productActions';
import Navbar from '../components/Navbar';
const OutOfStockScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const productList = useSelector(state => state.product);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(getOutOfStock('0'));
  }, [dispatch]);

  const getZeroItems = () => {
    dispatch(getOutOfStock('0'));
  };
  const getOneItem = () => {
    dispatch(getOutOfStock('1'));
  };
  return (
    <SafeAreaView style={isDarkMode ? styles.darkScroll : styles.lightScroll}>
      <Navbar />
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <Heading title={'Out Of Stock'} />
        <View style={styles.buttonsContainer}>
          <View style={styles.reloadContainer}>
            <TouchableOpacity
              style={isDarkMode ? styles.darkReloadBtn : styles.lightReloadBtn}
              onPress={() => getZeroItems()}>
              <MaterialCommunityIcons
                name={'reload'}
                size={25}
                color={isDarkMode ? COLORS.gray5 : COLORS.gray1}
              />
              <Text
                style={
                  isDarkMode ? styles.darkReloadTxt : styles.lightReloadTxt
                }>
                Reload
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.zeroContainer}>
            <TouchableOpacity
              style={isDarkMode ? styles.darkZeroBtn : styles.lightZeroBtn}
              onPress={() => getZeroItems()}>
              <Text
                style={isDarkMode ? styles.darkZeroTxt : styles.lightZeroTxt}>
                0
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.oneContainer}>
            <TouchableOpacity
              style={isDarkMode ? styles.darkOneBtn : styles.lightOneBtn}
              onPress={() => getOneItem()}>
              <Text
                style={isDarkMode ? styles.darkZeroTxt : styles.lightZeroTxt}>
                1
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size={SIZES.xxLarge}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
            />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={isDarkMode ? styles.darkTError : styles.lightTError}>
              We are Sorry!
            </Text>
            <Text style={isDarkMode ? styles.darkError : styles.lightError}>
              {error}
            </Text>
          </View>
        ) : products.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={isDarkMode ? styles.darkNoTxt : styles.lightNoTxt}>
              Stock In Check!
            </Text>
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            <FlatList
              data={products}
              keyExtractor={item => item._id}
              renderItem={({item}) => <OutItem product={item} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OutOfStockScreen;

const styles = StyleSheet.create({
  darkScroll: {
    backgroundColor: COLORS.gray2,
    minHeight: SIZES.height,
  },
  lightScroll: {
    backgroundColor: COLORS.white,
    minHeight: SIZES.height,
  },
  containerDark: {
    height: SIZES.height - 150,
  },
  containerLight: {
    height: SIZES.height - 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-beteween',
    alignItems: 'center',
  },

  reloadContainer: {
    marginHorizontal: 25,
  },
  darkReloadBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  lightReloadBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray7,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  darkReloadTxt: {
    color: COLORS.gray5,
    fontWeight: '600',
    marginLeft: 5,
    fontSize: SIZES.medium,
  },
  lightReloadTxt: {
    color: COLORS.gray2,
    fontWeight: '600',
    marginLeft: 5,
    fontSize: SIZES.medium,
  },
  zeroContainer: {
    marginLeft: 35,
  },
  darkZeroBtn: {
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: SIZES.xxSmall,
  },
  lightZeroBtn: {
    backgroundColor: COLORS.gray7,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: SIZES.xxSmall,
  },
  darkZeroTxt: {
    color: COLORS.gray5,
    fontWeight: '600',
    fontSize: SIZES.medium,
  },
  lightZeroTxt: {
    color: COLORS.gray2,
    fontWeight: '600',
    fontSize: SIZES.medium,
  },
  oneContainer: {
    marginLeft: 35,
  },
  darkOneBtn: {
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: SIZES.xxSmall,
  },
  lightOneBtn: {
    backgroundColor: COLORS.gray7,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: SIZES.xxSmall,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  darkTError: {
    color: COLORS.gray5,
    fontSize: SIZES.large,
    fontWeight: '900',
    alignSelf: 'center',
    marginTop: 20,
  },
  lightTError: {
    color: COLORS.gray2,
    marginTop: 20,
    fontSize: SIZES.large,
    fontWeight: '900',
    alignSelf: 'center',
  },
  lightError: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    alignSelf: 'center',
    color: COLORS.gray1,
  },
  darkError: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkNoTxt: {
    color: COLORS.gray5,
    fontSize: SIZES.large,
    fontWeight: '900',
    alignSelf: 'center',
    marginTop: 20,
  },
  lightNoTxt: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    alignSelf: 'center',
    color: COLORS.gray1,
  },
  itemsContainer: {
    paddingVertical: 20,
  },
});
