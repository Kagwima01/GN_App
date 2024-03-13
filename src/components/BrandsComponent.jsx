import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import {useColorScheme} from 'react-native';
import {useEffect} from 'react';
import BrandButton from './BrandButton';
import {useDispatch, useSelector} from 'react-redux';
import {getBrands} from '../redux/actions/filtersActions';

const BrandsComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {loading, error, brands} = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={SIZES.xxLarge}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
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
        <FlatList
          data={brands}
          keyExtractor={(item, index) => 'key' + index}
          numColumns={2}
          renderItem={({item}) => <BrandButton brand={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default BrandsComponent;

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
  container: {
    height: SIZES.height / 2.5,
    paddingVertical: 5,
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
