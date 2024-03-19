import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import {useColorScheme} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getNames} from '../redux/actions/filtersActions';
import ItemListComponent from '../components/ItemListComponent';
import Heading from '../components/Heading';
import {UIActivityIndicator} from 'react-native-indicators';

const ProductListScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {loading, error, names} = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(getNames());
  }, [dispatch]);
  return (
    <SafeAreaView
      style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <Heading title={'Products List'} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <UIActivityIndicator
            size={SIZES.xxLarge}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
          />
        </View>
      ) : error ? (
        <></>
      ) : (
        names && (
          <FlatList
            data={names}
            keyExtractor={(item, index) => 'key' + index}
            numColumns={1}
            renderItem={({item}) => <ItemListComponent name={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={<View style={styles.botttom}></View>}
          />
        )
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray2,
    height: '100%',
  },
  containerLight: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: SIZES.height - 180,
  },
  botttom: {
    height: 80,
  },
});
