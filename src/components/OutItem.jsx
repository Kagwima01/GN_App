import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  TextInput,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useState} from 'react';
import {updateStock} from '../redux/actions/adminActions';

const AmountSchema = Yup.object().shape({
  stock: Yup.number()
    .min(0, 'Can not be empty.')
    .required('Quantity is required'),
});

const OutItem = ({product}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userInfo} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showChangeInput, setShowChangeInput] = useState(false);
  const [stock, setStock] = useState(product.stock);
  const id = product._id;

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <View style={styles.dContainer}>
        <View style={styles.dWrapper}>
          <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
            Name:
          </Text>
        </View>
        <View>
          <Text style={isDarkMode ? styles.darkName : styles.lightName}>
            {product.name}
          </Text>
        </View>
      </View>
      <View style={styles.dContainer}>
        <View style={styles.dWrapper}>
          <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
            Category:
          </Text>
        </View>
        <View>
          <Text style={isDarkMode ? styles.darkDetails : styles.lightDetails}>
            {product.category}
          </Text>
        </View>
      </View>
      <View style={styles.dContainer}>
        <View style={styles.dWrapper}>
          <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
            Brand:
          </Text>
        </View>
        <View>
          <Text style={isDarkMode ? styles.darkDetails : styles.lightDetails}>
            {product.brand}
          </Text>
        </View>
      </View>
      <View style={styles.dContainer}>
        <View style={styles.dWrapper}>
          <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
            Stock:
          </Text>
        </View>
        <View>
          <Text style={isDarkMode ? styles.darkDetails : styles.lightDetails}>
            {stock}
          </Text>
        </View>
      </View>
      {userInfo === null ? (
        <></>
      ) : userInfo.isSuperAdmin && !showChangeInput ? (
        <View style={styles.editBtn}>
          <TouchableOpacity
            style={isDarkMode ? styles.darkEdtBtn : styles.lightEdtBtn}
            onPress={() => setShowChangeInput(true)}>
            <MaterialCommunityIcons
              name={'pencil'}
              size={25}
              color={isDarkMode ? COLORS.gray5 : COLORS.gray1}
            />
          </TouchableOpacity>
        </View>
      ) : (
        userInfo.isSuperAdmin &&
        showChangeInput && (
          <Formik
            initialValues={{stock: ''}}
            validationSchema={AmountSchema}
            onSubmit={values => {
              setStock(values.stock);
              dispatch(updateStock(id, values.stock));
              setShowChangeInput(false);
            }}>
            {({
              handleChange,
              handleSubmit,
              touched,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View
                  style={
                    isDarkMode
                      ? styles.darkChangeAmountWrapper
                      : styles.lightChangeAmountWrapper
                  }>
                  <View style={styles.lightInput}>
                    <TextInput
                      onFocus={() => {
                        setFieldTouched('stock');
                      }}
                      onBlur={() => setFieldTouched('stock', '')}
                      placeholder="How many pieces..."
                      keyboardType="numeric"
                      value={values.qty}
                      onChangeText={handleChange('stock')}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.changeInputBtn}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.ChangeInputBtnTxt}>Update</Text>
                  </TouchableOpacity>
                </View>
                {touched.stock && errors.stock && (
                  <Text style={styles.errorMessage}>{errors.stock}</Text>
                )}
              </View>
            )}
          </Formik>
        )
      )}
    </View>
  );
};

export default OutItem;

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: COLORS.gray1,
    width: '97%',
    alignSelf: 'center',
    elevation: 10,
    marginTop: 7,
    paddingStart: 10,
    paddingVertical: 4,
  },
  lightContainer: {
    backgroundColor: COLORS.gray7,
    width: '97%',
    alignSelf: 'center',
    elevation: 10,
    marginTop: 7,
    paddingStart: 10,
    paddingVertical: 4,
  },
  dContainer: {
    flexDirection: 'row',
  },
  dWrapper: {
    width: '30%',
  },
  darkDTxt: {
    color: COLORS.gray5,
    fontWeight: '700',
    fontSize: SIZES.medium,
  },
  lightDTxt: {
    color: COLORS.gray2,
    fontWeight: '700',
    fontSize: SIZES.medium,
  },
  darkName: {
    color: COLORS.gray5,
    fontWeight: '900',
    fontSize: SIZES.medium,
  },
  lightName: {
    color: COLORS.gray2,
    fontWeight: '900',
    fontSize: SIZES.medium,
  },
  darkDetails: {
    color: COLORS.gray5,
    fontWeight: '500',
    fontSize: SIZES.medium,
  },
  lightDetails: {
    color: COLORS.gray2,
    fontWeight: '500',
    fontSize: SIZES.medium,
  },
  editBtn: {
    alignSelf: 'flex-end',
  },
  darkEdtBtn: {
    backgroundColor: COLORS.gray6,
    marginEnd: 5,
    padding: 4,
    borderRadius: SIZES.xxSmall,
    marginTop: -20,
  },
  lightEdtBtn: {
    backgroundColor: COLORS.gray4,
    marginEnd: 5,
    padding: 4,
    borderRadius: SIZES.xxSmall,
    marginTop: -20,
  },
  darkChangeAmountWrapper: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: COLORS.gray5,
    backgroundColor: COLORS.gray2,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  lightChangeAmountWrapper: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  lightInput: {
    width: 230,
    paddingHorizontal: SIZES.small,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
    color: COLORS.red,
  },
  changeInputBtn: {
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChangeInputBtnTxt: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 13,
  },
});
