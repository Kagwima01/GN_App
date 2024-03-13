import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(state => state.user);
  const {userInfo} = user;

  return (
    <SafeAreaView>
      <View style={isDarkMode ? styles.navbarDark : styles.navbarLight}>
        <View style={styles.navContainer}>
          <View style={styles.navLogo}>
            <TouchableOpacity style={styles.logo}>
              <Image
                source={require('../../assets/images/gnlogo.jpg')}
                style={styles.bLogo}
              />
            </TouchableOpacity>
            <Text style={isDarkMode ? styles.navTextDark : styles.navTextLight}>
              GN Cyclemart
            </Text>
          </View>
        </View>
        {userInfo === null ? (
          <View style={styles.accContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={isDarkMode ? styles.darkSignTxt : styles.lightSignTxt}>
                Sighn In
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          userInfo && (
            <View style={styles.accContainer}>
              <MaterialCommunityIcons
                name="account-check-outline"
                size={30}
                color={isDarkMode ? COLORS.gray5 : COLORS.gray2}
              />
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbarDark: {
    width: SIZES.width,
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray3,
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
  },
  navbarLight: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gray7,
    height: 60,
    flexDirection: 'row',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.xSmall,
  },
  navLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 60,
    justifyContent: 'center',
  },
  bLogo: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  navTextDark: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.gray5,
  },
  navTextLight: {
    marginStart: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.gray2,
  },
  accContainer: {
    marginRight: 15,
  },
  darkSignTxt: {
    color: COLORS.primary1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  lightSignTxt: {
    color: COLORS.secondary1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
