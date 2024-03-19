import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../redux/actions/productActions';
import {COLORS, SIZES} from '../constants';
import React from 'react';
import {useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BarIndicator} from 'react-native-indicators';

const ProductsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const productList = useSelector(state => state.product);
  const {loading, error, products, pagination} = productList;

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);
  const paginationButtonClick = page => {
    dispatch(getProducts(page));
  };
  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkBackground : styles.lightBackground}>
      <Navbar />
      <SearchBar />
      <View style={styles.scroll}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <BarIndicator
              count={4}
              size={30}
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
                ListFooterComponent={
                  <View style={styles.paginationContainer}>
                    <View>
                      <TouchableOpacity
                        onPress={() => paginationButtonClick(1)}
                        style={{marginHorizontal: 7}}>
                        <MaterialCommunityIcons
                          name="chevron-double-left"
                          size={30}
                          color={
                            isDarkMode ? COLORS.primary1 : COLORS.secondary1
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true}>
                      {Array.from(Array(pagination.totalPages), (e, i) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            onPress={() => paginationButtonClick(i + 1)}
                            style={{
                              backgroundColor:
                                pagination.currentPage === i + 1
                                  ? '#63B3ED'
                                  : 'gray',
                              paddingHorizontal: 12,
                              paddingVertical: 7,
                              marginHorizontal: 7,
                              borderRadius: SIZES.xxSmall,
                            }}>
                            <Text
                              style={
                                isDarkMode
                                  ? styles.darkIText
                                  : styles.lightIText
                              }>
                              {i + 1}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          paginationButtonClick(pagination.totalPages)
                        }
                        style={{marginHorizontal: 7}}>
                        <MaterialCommunityIcons
                          name="chevron-double-right"
                          size={30}
                          color={
                            isDarkMode ? COLORS.primary1 : COLORS.secondary1
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                }
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductsScreen;

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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: SIZES.height - 180,
  },

  container: {
    alignItems: 'center',
    paddingTop: SIZES.small,
    paddingLeft: SIZES.small / 4,
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  separator: {
    height: 16,
  },

  paginationContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 40,
    alignItems: 'center',
    width: SIZES.width,
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
  darkIText: {
    color: COLORS.gray5,
    fontWeight: '600',
  },
  lightIText: {
    color: COLORS.gray2,
    fontWeight: '600',
  },
});
