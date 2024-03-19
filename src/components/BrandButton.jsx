import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';

const BrandButton = ({brand}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Brand', {brand})}>
      <View style={isDarkMode ? styles.darkBtn : styles.lightBtn}>
        <Text style={isDarkMode ? styles.darkTxt : styles.lightTxt}>
          {brand}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BrandButton;

const styles = StyleSheet.create({
  darkBtn: {
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: COLORS.primary1,
    paddingVertical: 7,
    width: SIZES.width / 2 - 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  lightBtn: {
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: COLORS.secondary1,
    paddingVertical: 7,
    width: SIZES.width / 2 - 10,
    marginHorizontal: 5,
    borderRadius: 7,
  },
  darkTxt: {
    alignSelf: 'center',
    color: COLORS.primary1,
    fontWeight: '600',
  },
  lightTxt: {
    alignSelf: 'center',
    color: COLORS.secondary1,
    fontWeight: '600',
  },
});
