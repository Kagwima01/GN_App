import {ScrollView, StyleSheet, useColorScheme, Text, View} from 'react-native';
import React from 'react';
import Heading from '../components/Heading';
import {COLORS, SIZES} from '../constants';

const InfoScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView style={isDarkMode ? styles.darkScroll : styles.lightScroll}>
      <Heading title={'General Info'} />
      <View style={styles.wrapper}>
        <View>
          <View>
            <Text style={isDarkMode ? styles.darkDLabel : styles.lightDLabel}>
              Country
            </Text>
          </View>
          <View>
            <Text style={isDarkMode ? styles.darkDText : styles.lightDText}>
              Kenya
            </Text>
          </View>
        </View>
        <View style={styles.cWrapper}>
          <View>
            <Text style={isDarkMode ? styles.darkDLabel : styles.lightDLabel}>
              Location
            </Text>
          </View>
          <View>
            <Text style={isDarkMode ? styles.darkDText : styles.lightDText}>
              Burnt Forest
            </Text>
          </View>
        </View>
        <View style={styles.cWrapper}>
          <View>
            <Text style={isDarkMode ? styles.darkDLabel : styles.lightDLabel}>
              PO.Box
            </Text>
          </View>
          <View>
            <Text style={isDarkMode ? styles.darkDText : styles.lightDText}>
              2589 Eldoret
            </Text>
          </View>
        </View>
      </View>
      <Heading title={'Developer Info'} />
      <View style={styles.wrapper}>
        <View>
          <View>
            <Text style={isDarkMode ? styles.darkDLabel : styles.lightDLabel}>
              Email
            </Text>
          </View>
          <View>
            <Text style={isDarkMode ? styles.darkDText : styles.lightDText}>
              walterkagwima2023@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.cWrapper}>
          <View>
            <Text style={isDarkMode ? styles.darkDLabel : styles.lightDLabel}>
              Contact
            </Text>
          </View>
          <View>
            <Text style={isDarkMode ? styles.darkDText : styles.lightDText}>
              +254 731321713
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  darkScroll: {
    backgroundColor: COLORS.gray2,
  },
  lightScroll: {
    backgroundColor: COLORS.white,
  },
  wrapper: {
    marginLeft: SIZES.medium,
  },
  darkDLabel: {
    color: COLORS.gray5,
    fontWeight: '700',
    fontSize: SIZES.medium,
  },
  lightDLabel: {
    color: COLORS.gray2,
    fontWeight: '700',
    fontSize: SIZES.medium,
  },
  cWrapper: {
    marginTop: 10,
  },
  darkDText: {
    color: COLORS.gray4,
    fontWeight: '500',
    fontSize: SIZES.medium,
  },
  lightDText: {
    color: COLORS.gray1,
    fontWeight: '500',
    fontSize: SIZES.medium,
  },
});
