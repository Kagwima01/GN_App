import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';

const CategoryButton = ({category}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Category', {category})}>
      <View style={isDarkMode ? styles.darkBtn : styles.lightBtn}>
        <Text style={isDarkMode ? styles.darkTxt : styles.lightTxt}>
          {category}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  darkBtn: {
    paddingHorizontal: 5,
    backgroundColor: COLORS.primary1,
    paddingVertical: 7,
    width: SIZES.width / 2 - 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  lightBtn: {
    paddingHorizontal: 5,
    backgroundColor: COLORS.secondary1,
    paddingVertical: 7,
    width: SIZES.width / 2 - 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  darkTxt: {
    alignSelf: 'center',
    color: COLORS.gray2,
    fontWeight: '600',
  },
  lightTxt: {
    alignSelf: 'center',
    color: COLORS.white,
    fontWeight: '600',
  },
});
