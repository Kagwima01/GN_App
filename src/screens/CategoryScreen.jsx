import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useColorScheme} from 'react-native';
import {getProductsByCategory} from '../redux/actions/filtersActions';
import {useRoute} from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import Heading from '../components/Heading';

const CategoryScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const route = useRoute();
  const {category} = route.params;
  const {loading, error, products} = useSelector(state => state.filters);
  useEffect(() => {
    dispatch(getProductsByCategory(category));
    console.log(category);
  }, [dispatch]);
  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}>
      <Heading title={category} />
      <View style={styles.scroll}>
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
          <>
            <View style={styles.container}>
              <FlatList
                data={products}
                keyExtractor={item => item._id}
                numColumns={2}
                renderItem={({item}) => <ProductCard product={item} />}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: COLORS.gray2,
  },
  lightBackground: {
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  container: {
    alignItems: 'center',
    paddingTop: SIZES.small,
    paddingLeft: SIZES.small / 4,
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  separator: {
    height: 16,
  },
  scroll: {
    height: SIZES.height - 50,
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
