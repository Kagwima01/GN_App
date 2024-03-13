//react
import React from 'react';

//react native
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {confirmSale, resetSales} from '../redux/actions/salesActions';

//components
import SalesItem from '../components/SalesItem';
import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import {SIZES, COLORS} from '../constants';

const SalesScreen = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const {loading, error, salesItems} = useSelector(state => state.sales);
  const getHeadingContent = () =>
    salesItems.length === 1 ? '(1 Item)' : `(${salesItems.length} Items)`;

  const showConfirmToast = () => {
    ToastAndroid.show('Sales confirmed Successfully !', ToastAndroid.SHORT);
  };

  const confirmSales = () => {
    Alert.alert('Confirm Sales', 'Are you sure to Confirm your daily Sales? ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(confirmSale());
          dispatch(resetSales());
          showConfirmToast();
          navigation.replace('Bottom navigation');
        },
      },
    ]);
  };

  return (
    <SafeAreaView>
      <Navbar />
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <Heading title={'Daily Sales'} />
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
        ) : salesItems.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={isDarkMode ? styles.darkNoTxt : styles.lightNoTxt}>
              No Items
            </Text>
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            <FlatList
              data={salesItems}
              keyExtractor={item => item.id}
              renderItem={({item}) => <SalesItem product={item} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={
                <View>
                  <TouchableOpacity
                    style={isDarkMode ? styles.darkBtn : styles.lightBtn}
                    onPress={() => confirmSales()}>
                    <Text
                      style={
                        isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt
                      }>
                      Confirm Sales
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray2,
    height: SIZES.height,
    paddingBottom: 130,
  },
  containerLight: {
    height: SIZES.height,
    backgroundColor: COLORS.white,
    paddingBottom: 130,
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
  darkBtn: {
    backgroundColor: COLORS.primary1,
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginVertical: 25,
    alignSelf: 'center',
    borderRadius: SIZES.large,
  },
  lightBtn: {
    backgroundColor: COLORS.secondary1,
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginVertical: 25,
    alignSelf: 'center',
    borderRadius: SIZES.large,
  },
  darkBtnTxt: {
    fontWeight: '600',
    color: COLORS.gray5,
  },
  lightBtnTxt: {
    fontWeight: '600',
    color: COLORS.gray2,
  },
});
