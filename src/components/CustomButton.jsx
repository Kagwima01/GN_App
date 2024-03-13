import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {useColorScheme} from 'react-native';

const CustomButton = ({title, onPress, isValid, loader}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isDarkMode
          ? styles.darkBtnStyle(isValid ? COLORS.primary1 : COLORS.gray2)
          : styles.lightBtnStyle(isValid ? COLORS.secondary1 : COLORS.gray4)
      }>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <Text style={isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  lightBtnTxt: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 18,
  },
  darkBtnTxt: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 18,
  },
  lightBtnStyle: backgroundColor => ({
    height: 40,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.large,
  }),
  darkBtnStyle: backgroundColor => ({
    height: 40,
    width: '100%',
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.large,
  }),
});
