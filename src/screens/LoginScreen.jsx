import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import BackBtn from '../components/BackBtn';
import CustomButton from '../components/CustomButton';
import {Formik} from 'formik';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {login, googleLogin} from '../redux/actions/userActions';
import {useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Password must be more than four characters')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Required'),
});

const LoginScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [obsecureText, setObsecureText] = useState(false);

  const dispatch = useDispatch();
  const {loading, error, userInfo, serverMsg} = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (userInfo) {
      showToast();
      navigation.replace('Bottom navigation');
    }
  }, [userInfo]);

  const showToast = () => {
    ToastAndroid.show('Login Successfull !', ToastAndroid.SHORT);
  };

  const inValidForm = () => {
    Alert.alert('Invalid Form', 'Please provide all required fields', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Ok',
        onPress: () => console.log('Continue pressed'),
      },
    ]);
  };

  return (
    <ScrollView
      style={{backgroundColor: isDarkMode ? COLORS.gray2 : COLORS.lightWhite}}>
      <SafeAreaView
        style={{
          marginHorizontal: 20,
        }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />

          <Text style={isDarkMode ? styles.darkTitle : styles.lightTitle}>
            Log in to your account
          </Text>
          <View style={styles.titleWrapper}>
            <Text
              style={isDarkMode ? styles.darkRegTitle : styles.lightRegTitle}>
              Don't have an account ?
            </Text>
            <Text
              onPress={() => {
                navigation.navigate('Registration');
              }}
              style={
                isDarkMode ? styles.darkRegistration : styles.lightRegistration
              }>
              Sign up
            </Text>
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              dispatch(login(values.email, values.password));
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View
                style={
                  isDarkMode ? styles.darkContainer : styles.lightContainer
                }>
                <View style={styles.wrapper}>
                  <Text
                    style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
                    Email
                  </Text>
                  <View
                    style={
                      isDarkMode
                        ? styles.darkInputWrapper(
                            touched.email ? COLORS.primary1 : COLORS.offwhite,
                          )
                        : styles.lightInputWrapper(
                            touched.email ? COLORS.secondary1 : COLORS.offwhite,
                          )
                    }>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={isDarkMode ? COLORS.gray5 : COLORS.gray3}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => setFieldTouched('email', '')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                      value={values.email}
                      onChangeText={text => handleChange('email')(text.trim())}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text
                    style={isDarkMode ? styles.darkLabel : styles.lightLabel}>
                    Password
                  </Text>
                  <View
                    style={
                      isDarkMode
                        ? styles.darkInputWrapper(
                            touched.password
                              ? COLORS.primary1
                              : COLORS.offwhite,
                          )
                        : styles.lightInputWrapper(
                            touched.password
                              ? COLORS.secondary1
                              : COLORS.offwhite,
                          )
                    }>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={isDarkMode ? COLORS.gray5 : COLORS.gray3}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="Password"
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => setFieldTouched('password', '')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                      value={values.password}
                      onChangeText={text =>
                        handleChange('password')(text.trim())
                      }
                    />
                    <TouchableOpacity
                      onPress={() => setObsecureText(!obsecureText)}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={isDarkMode ? COLORS.gray5 : COLORS.gray3}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={isDarkMode ? styles.darkBtn : styles.lightBtn}>
                  <Text
                    style={isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt}>
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
                <CustomButton
                  loader={loading}
                  title={'Sign in'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
                <TouchableOpacity style={styles.googleLogin}>
                  <Image
                    source={require('../../assets/images/google.jpg')}
                    style={styles.googleLogo}
                  />
                  <Text style={styles.googleLoginTxt}>Google sign in</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  lightContainer: {
    width: SIZES.width - 20,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 20,
    backgroundColor: COLORS.gray7,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: SIZES.height / 1.4,
    justifyContent: 'center',
  },
  darkContainer: {
    width: SIZES.width - 20,
    marginTop: 20,
    alignSelf: 'center',
    elevation: 20,
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 10,
    marginBottom: 20,
    height: SIZES.height / 1.4,
    justifyContent: 'center',
  },

  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondary1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: SIZES.large,
    marginEnd: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  googleLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.white,
    height: 40,
  },
  googleLogo: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleLoginTxt: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 18,
  },
  darkBtn: {
    borderWidth: 0.5,
    borderColor: COLORS.primary1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: SIZES.large,
    marginEnd: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  lightBtnTxt: {
    color: COLORS.secondary1,
    fontWeight: '500',
    fontSize: 15,
  },
  darkBtnTxt: {
    color: COLORS.primary1,
    fontWeight: '500',
    fontSize: 15,
  },
  lightTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.black,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 60,
  },
  darkTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
    color: COLORS.gray5,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 60,
  },
  wrapper: {
    marginVertical: 15,
  },
  lightLabel: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
    marginStart: 5,
    textAlign: 'left',
    color: COLORS.black,
  },
  darkLabel: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
    marginStart: 5,
    textAlign: 'left',
    color: COLORS.gray5,
  },
  lightInputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 0.3,
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 12,
  }),
  darkInputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.gray6,
    borderWidth: 0.5,
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 12,
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
    color: COLORS.red,
  },
  darkRegTitle: {
    textAlign: 'center',
    color: COLORS.gray5,
    fontWeight: 'bold',
    fontSize: 16,
    marginEnd: 10,
  },
  lightRegTitle: {
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
    marginEnd: 10,
  },
  lightRegistration: {
    textAlign: 'center',
    color: COLORS.secondary1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  darkRegistration: {
    textAlign: 'center',
    color: COLORS.primary1,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
