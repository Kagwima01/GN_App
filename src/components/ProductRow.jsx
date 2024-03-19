import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {getNewProducts} from '../redux/actions/productActions';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useColorScheme} from 'react-native';
import ProductCard from './ProductCard';
import {BarIndicator} from 'react-native-indicators';

const ProductRow = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const productList = useSelector(state => state.product);
  const {loading, error, newProducts} = productList;

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  return (
    <View style={styles.productRowContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <BarIndicator
            size={30}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
            count={4}
          />
        </View>
      ) : error ? (
        <>
          <Text style={isDarkMode ? styles.darkTError : styles.lightTError}>
            We are Sorry!
          </Text>
          <Text style={isDarkMode ? styles.darkError : styles.lightError}>
            {error}
          </Text>
        </>
      ) : (
        <View style={styles.itemsContainer}>
          <FlatList
            data={newProducts}
            keyExtractor={item => item._id}
            renderItem={({item}) => <ProductCard product={item} />}
            horizontal={true}
            ListFooterComponent={<View style={styles.botttom}></View>}
          />
        </View>
      )}
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  productRowContainer: {
    marginTop: SIZES.small,
    marginLeft: 12,
  },

  container: {
    paddingVertical: 2,
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

  botttom: {
    //height: 80,
  },
});
