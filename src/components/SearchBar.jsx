import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <View
      style={
        isDarkMode ? styles.searchContainerDark : styles.searchContainerLight
      }>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value=""
          onPressIn={() => {
            navigation.navigate('Search');
          }}
          placeholder="Search from GN Cyclemart..."
        />
      </View>
      <TouchableOpacity style={styles.searchIcon}>
        <MaterialCommunityIcons
          name="magnify"
          size={35}
          color={isDarkMode ? COLORS.gray5 : COLORS.gray1}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray6,
    justifyContent: 'space-between',
    height: 40,
    width: SIZES.width - 44,
    marginHorizontal: 20,
    borderRadius: SIZES.large,
    marginVertical: SIZES.xSmall,
  },
  searchContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray7,
    justifyContent: 'space-between',
    height: 40,
    width: SIZES.width - 44,
    marginHorizontal: 20,
    borderRadius: SIZES.large,
    marginVertical: SIZES.xSmall,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    paddingHorizontal: SIZES.small,
    width: '100%',
    height: '100%',
    fontWeight: '600',
  },
  searchIcon: {
    marginEnd: 20,
  },
});
