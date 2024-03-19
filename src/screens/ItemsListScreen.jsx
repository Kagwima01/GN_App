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
import {getProductsByName} from '../redux/actions/filtersActions';
import {useRoute} from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import Heading from '../components/Heading';
import {BarIndicator} from 'react-native-indicators';

const ItemsListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const route = useRoute();
  const {name} = route.params;
  const {loading, error, products} = useSelector(state => state.filters);
  useEffect(() => {
    dispatch(getProductsByName(name));
  }, [dispatch]);
  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}>
      <Heading title={name} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <BarIndicator
            size={30}
            count={4}
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
        products && (
          <>
            <View style={styles.container}>
              <FlatList
                data={products}
                keyExtractor={item => item._id}
                numColumns={2}
                renderItem={({item}) => <ProductCard product={item} />}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponentStyle={<View style={styles.bottom}></View>}
              />
            </View>
          </>
        )
      )}
    </SafeAreaView>
  );
};

export default ItemsListScreen;

const styles = StyleSheet.create({
  darkBackground: {
    backgroundColor: COLORS.gray2,
    height: '100%',
  },
  lightBackground: {
    backgroundColor: COLORS.white,
    height: '100%',
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
    paddingBottom: 50,
  },
  separator: {
    height: 16,
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
  bottom: {
    height: 80,
  },
});
