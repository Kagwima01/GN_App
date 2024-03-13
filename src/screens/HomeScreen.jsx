import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';
import Navbar from '../components/Navbar';
import {COLORS, SIZES} from '../constants';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import ProductRow from '../components/ProductRow';
import Headings from '../components/Headings';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <Navbar />
      <View>
        <SearchBar />
        <ScrollView
          style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
          <Carousel />
          <Headings />
          <ProductRow />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray2,
    height: '100%',
  },
  containerLight: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  darkContainer: {
    backgroundColor: COLORS.gray2,
    height: 495,
  },
  lightContainer: {
    height: 495,
    backgroundColor: COLORS.white,
  },
});
