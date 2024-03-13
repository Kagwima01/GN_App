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
        <ActivityIndicator
          size={SIZES.xxLarge}
          color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
        />
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
        <FlatList
          data={newProducts}
          keyExtractor={item => item._id}
          renderItem={({item}) => <ProductCard product={item} />}
          horizontal={true}
        />
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
});
