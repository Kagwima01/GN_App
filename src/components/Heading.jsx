import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import {useColorScheme} from 'react-native';

const Heading = ({title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.headerDark : styles.headerLight}>
        {title}
      </Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginHorizontal: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.gray6,
    borderBottomWidth: 0.5,
  },
  headerDark: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.gray5,
    marginBottom: 7,
  },
  headerLight: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.gray2,
  },
});
