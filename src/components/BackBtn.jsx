import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';
import {useColorScheme} from 'react-native';
const BackBtn = ({onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity onPress={onPress} style={styles.backBtn}>
      <Ionicons
        name="chevron-back-circle"
        size={35}
        color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: SIZES.large - 10,
  },
});
