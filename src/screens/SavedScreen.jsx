import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import Heading from '../components/Heading';
import Navbar from '../components/Navbar';
import SavedItem from '../components/SavedItem';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SavedScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const {loading, error, favorites} = useSelector(state => state.save);

  return (
    <SafeAreaView>
      <Navbar />
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <Heading title={'Saved Items'} />
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
        ) : favorites.length <= 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={isDarkMode ? styles.darkNoTxt : styles.lightNoTxt}>
              No Saved Items
            </Text>
            <TouchableOpacity
              style={isDarkMode ? styles.darkGBtn : styles.lightGBtn}
              onPress={() => {
                navigation.navigate('Products');
              }}>
              <Text style={isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt}>
                Go to Products
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            <FlatList
              data={favorites}
              keyExtractor={item => item.id}
              renderItem={({item}) => <SavedItem product={item} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray2,
    height: SIZES.height,
    paddingBottom: 190,
  },
  containerLight: {
    backgroundColor: COLORS.white,
    height: SIZES.height,
    paddingBottom: 190,
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
  darkGBtn: {
    borderWidth: 0.5,
    borderColor: COLORS.primary1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: SIZES.medium,
  },
  lightGBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondary1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    borderRadius: SIZES.medium,
  },
  darkBtnTxt: {
    color: COLORS.primary1,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  lightBtnTxt: {
    color: COLORS.secondary1,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
});
