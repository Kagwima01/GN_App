import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import CategoryComponent from '../components/CategoryComponent';
import BrandsComponent from '../components/BrandsComponent';

const FeaturedScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <View>
        <View>
          <Heading title={'Categories'} />
          <CategoryComponent />
        </View>
      </View>
      <View>
        <View>
          <Heading title={'Brands'} />
          <BrandsComponent />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeaturedScreen;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray2,
    height: SIZES.height - 20,
  },
  containerLight: {
    backgroundColor: COLORS.white,
    height: SIZES.height - 20,
  },
});
