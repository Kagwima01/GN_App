import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/actions/userActions';
import {useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {clearSales} from '../redux/slices/sale';
import {clearSave} from '../redux/slices/save';
import {deleteAccount} from '../redux/actions/userActions';

const ProfileScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {userInfo} = user;

  const showLogOutToast = () => {
    ToastAndroid.show('You have been logged out !', ToastAndroid.SHORT);
  };
  const showClearCacheToast = () => {
    ToastAndroid.show('Your app cache cleared !', ToastAndroid.SHORT);
  };
  const showDeleteAccountToast = () => {
    ToastAndroid.show('Account Deleted !', ToastAndroid.SHORT);
  };

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure to logout? ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(logout());
          showLogOutToast();
          navigation.replace('Bottom navigation');
        },
      },
    ]);
  };
  const clearCacheHandler = () => {
    Alert.alert('Clear Cache', 'Are you sure to clear cached data? ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Clear',
        onPress: () => {
          dispatch(clearSales());
          dispatch(clearSave());
          showClearCacheToast();
        },
      },
    ]);
  };
  const deleteAccountHandler = () => {
    Alert.alert('Delete Account', 'Are you sure to Delete your Account? ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteAccount(userInfo._id));
          dispatch(logout());
          showDeleteAccountToast();
          navigation.replace('Bottom navigation');
        },
      },
    ]);
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
        <View style={{width: '100%'}}>
          <Image
            source={require('../../assets/images/space.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/userDefault.png')}
            style={styles.profile}
          />
          <Text style={isDarkMode ? styles.darkName : styles.lightName}>
            {userInfo ? userInfo.name : 'Log in to your account '}
          </Text>
          {userInfo === null ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View
                  style={
                    isDarkMode ? styles.darkLoginBtn : styles.lightLoginBtn
                  }>
                  <Text
                    style={
                      isDarkMode ? styles.darkMenuText : styles.lightMenuText
                    }>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={isDarkMode ? styles.darkName : styles.lightName}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}>
                <View
                  style={
                    isDarkMode ? styles.darkLoginBtn : styles.lightLoginBtn
                  }>
                  <Text
                    style={
                      isDarkMode ? styles.darkMenuText : styles.lightMenuText
                    }>
                    Sighn Up{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <ScrollView>
                <View
                  style={
                    isDarkMode
                      ? styles.darkEmailWrapper
                      : styles.lightEmailWrapper
                  }>
                  <Text
                    style={
                      isDarkMode ? styles.darkEmailText : styles.lightEmailText
                    }>
                    {userInfo.email}
                  </Text>
                </View>
                <View
                  style={
                    isDarkMode
                      ? styles.darkMenuWrapper
                      : styles.lightMenuWrapper
                  }>
                  {userInfo.isAdmin && (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Sales')}>
                        <View
                          style={
                            isDarkMode
                              ? styles.darkMenuItem(0.2)
                              : styles.lightMenuItem(0.2)
                          }>
                          <MaterialCommunityIcons
                            name="currency-usd"
                            size={24}
                            color={
                              isDarkMode ? COLORS.primary1 : COLORS.secondary1
                            }
                          />
                          <Text
                            style={
                              isDarkMode ? styles.darkMText : styles.lightMText
                            }>
                            Daily Sales
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('OutOfStock')}>
                        <View
                          style={
                            isDarkMode
                              ? styles.darkMenuItem(0.2)
                              : styles.lightMenuItem(0.2)
                          }>
                          <MaterialCommunityIcons
                            name="history"
                            size={24}
                            color={
                              isDarkMode ? COLORS.primary1 : COLORS.secondary1
                            }
                          />
                          <Text
                            style={
                              isDarkMode ? styles.darkMText : styles.lightMText
                            }>
                            Out Of Stock
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}

                  <TouchableOpacity onPress={() => clearCacheHandler()}>
                    <View
                      style={
                        isDarkMode
                          ? styles.darkMenuItem(0.2)
                          : styles.lightMenuItem(0.2)
                      }>
                      <MaterialCommunityIcons
                        name="cached"
                        size={24}
                        color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
                      />
                      <Text
                        style={
                          isDarkMode ? styles.darkMText : styles.lightMText
                        }>
                        Clear Cache
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => logoutHandler()}>
                    <View
                      style={
                        isDarkMode
                          ? styles.darkMenuItem(0.2)
                          : styles.lightMenuItem(0.2)
                      }>
                      <AntDesign
                        name="logout"
                        size={24}
                        color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
                      />
                      <Text
                        style={
                          isDarkMode ? styles.darkMText : styles.lightMText
                        }>
                        Logout
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteAccountHandler()}>
                    <View
                      style={
                        isDarkMode
                          ? styles.darkMenuItem(0.2)
                          : styles.lightMenuItem(0.2)
                      }>
                      <AntDesign
                        name="deleteuser"
                        size={24}
                        color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
                      />
                      <Text
                        style={
                          isDarkMode ? styles.darkMText : styles.lightMText
                        }>
                        Delete Account
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  lightContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 240,
    width: '100%',
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 99,
    resizeMode: 'cover',
    marginTop: -90,
  },
  lightName: {
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: 5,
  },
  darkName: {
    fontWeight: 'bold',
    color: COLORS.gray5,
    marginVertical: 5,
  },
  lightEmailWrapper: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: SIZES.large,
    borderColor: COLORS.secondary1,
  },
  darkEmailWrapper: {
    alignSelf: 'center',
    borderWidth: 0.3,
    borderRadius: SIZES.large,
    borderColor: COLORS.primary1,
  },
  lightEmailText: {
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: COLORS.gray1,
  },
  darkEmailText: {
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: COLORS.gray5,
  },
  lightLoginBtn: {
    height: 40,
    backgroundColor: COLORS.secondary1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.large,
    width: SIZES.width - 44,
  },
  darkLoginBtn: {
    backgroundColor: COLORS.primary1,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.large,
    width: SIZES.width - 44,
    height: 40,
  },
  lightMenuText: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 18,
  },
  darkMenuText: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 18,
  },
  lightMText: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 15,
    marginLeft: 20,
  },
  darkMText: {
    fontWeight: 'bold',
    color: COLORS.gray5,
    fontSize: 15,
    marginLeft: 20,
  },
  lightMenuWrapper: {
    marginTop: SIZES.medium,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    marginBottom: 100,
  },
  darkMenuWrapper: {
    marginTop: SIZES.medium,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.gray2,
    borderRadius: 12,
    marginBottom: 100,
  },
  lightMenuItem: borderBottomWidth => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray2,
  }),
  darkMenuItem: borderBottomWidth => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray5,
  }),
});
