import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import {useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Headings = () => {
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.headerDark : styles.headerLight}>
        New Rivals
      </Text>
      <TouchableOpacity
        style={isDarkMode ? styles.darkDiscover : styles.lightDiscover}
        onPress={() => {
          navigation.navigate('Featured');
        }}>
        <Text style={isDarkMode ? styles.discoverDark : styles.discoverLight}>
          Discover
        </Text>
        <MaterialCommunityIcons
          name="arrow-right-bold"
          size={30}
          color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Headings;

const styles = StyleSheet.create({
  darkContainer: {
    marginTop: SIZES.medium,
    // marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray3,
    paddingHorizontal: 10,
    height: 55,
  },
  lightContainer: {
    marginTop: SIZES.medium,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray7,
    height: 55,
    width: '100%',
  },
  headerDark: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.gray5,
  },
  discoverDark: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.primary1,
    marginRight: 5,
  },
  discoverLight: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.secondary1,
    marginRight: 5,
  },
  headerLight: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.gray2,
  },
  darkDiscover: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
  },
  lightDiscover: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
    backgroundColor: '#a0aec091',
  },
});
