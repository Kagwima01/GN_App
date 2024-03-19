import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CategoryButton from './CategoryButton';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories} from '../redux/actions/filtersActions';
import {UIActivityIndicator} from 'react-native-indicators';

const CategoryComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {loading, error, categories} = useSelector(state => state.filters);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <UIActivityIndicator
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
          data={categories}
          keyExtractor={(item, index) => 'key' + index}
          numColumns={2}
          renderItem={({item}) => <CategoryButton category={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  separator: {
    height: 16,
  },
  container: {
    height: SIZES.height / 2.5,
    paddingVertical: 5,
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
});
