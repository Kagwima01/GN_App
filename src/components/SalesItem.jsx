import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
  TextInput,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {removeSalesItem} from '../redux/actions/salesActions';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useState} from 'react';
import {addSalesItem} from '../redux/actions/salesActions';

const AmountSchema = Yup.object().shape({
  qty: Yup.number()
    .min(2, 'Least amount is 1 piece')
    .required('Amount is required'),
});

const SalesItem = ({product}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {name, image, price, qty, id} = product;
  const dispatch = useDispatch();
  const [showChangeInput, setShowChangeInput] = useState(false);
  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: `${product.image}`}} style={styles.image} />
        </View>
        <View style={styles.details}>
          <View style={styles.nameWrapper}>
            <View style={styles.nameContainer}>
              <Text style={isDarkMode ? styles.darkName : styles.lightName}>
                {product.name}
              </Text>
            </View>
            <View>
              <TouchableWithoutFeedback
                style={isDarkMode ? styles.darkCloseBtn : styles.lightCloseBtn}
                onPress={() => dispatch(removeSalesItem(id))}>
                <MaterialCommunityIcons
                  name={'close'}
                  size={25}
                  color={'red'}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.quantityWrapper}>
            <View style={styles.dContainer}>
              <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
                Quantity:
              </Text>
            </View>
            <View>
              <Text
                style={isDarkMode ? styles.darkQuantity : styles.lightQuantity}>
                {product.qty}
              </Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <View style={styles.dContainer}>
              <Text style={isDarkMode ? styles.darkDTxt : styles.lightDTxt}>
                Price:
              </Text>
            </View>
            <View>
              <Text style={isDarkMode ? styles.darkPrice : styles.lightPrice}>
                {product.price} per piece
              </Text>
            </View>
          </View>
          <View style={styles.subWrapper}>
            <View style={styles.dContainer}>
              <Text style={isDarkMode ? styles.darkSubTxt : styles.lightSubTxt}>
                Subtotal:
              </Text>
            </View>
            <View>
              <Text
                style={isDarkMode ? styles.darkSubtotal : styles.lightSubtotal}>
                Ksh {product.qty * product.price}
              </Text>
            </View>
          </View>
          {!showChangeInput && (
            <View style={styles.changeBtnContainer}>
              <TouchableOpacity
                style={
                  isDarkMode ? styles.darkChangeBtn : styles.lightChangeBtn
                }
                onPress={() => setShowChangeInput(true)}>
                <Text
                  style={
                    isDarkMode
                      ? styles.darkChangeBtnTxt
                      : styles.lightChangeBtnTxt
                  }>
                  Change Amount
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showChangeInput && (
            <Formik
              initialValues={{qty: ''}}
              validationSchema={AmountSchema}
              onSubmit={values => {
                dispatch(addSalesItem(id, values.qty));
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
                            setFieldTouched('qty');
                          }}
                          onBlur={() => setFieldTouched('qty', '')}
                          placeholder="Pieces..."
                          keyboardType="numeric"
                          value={values.qty}
                          onChangeText={handleChange('qty')}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.changeInputBtn}
                        disabled={!isValid}
                        onPress={handleSubmit}>
                        <Text style={styles.ChangeInputBtnTxt}>Save</Text>
                      </TouchableOpacity>
                    </View>
                    {touched.amount && errors.amount && (
                      <Text style={styles.errorMessage}>{errors.amount}</Text>
                    )}
                  </View>
                </View>
              )}
            </Formik>
          )}
        </View>
      </View>
    </View>
  );
};

export default SalesItem;

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: COLORS.gray1,
    width: '97%',
    alignSelf: 'center',
    elevation: 10,
    marginTop: 7,
    paddingVertical: 2,
  },
  containerLight: {
    backgroundColor: '#E2E8F0',
    width: '97%',
    alignSelf: 'center',
    elevation: 10,
    marginTop: 7,
    paddingVertical: 2,
  },
  container: {
    flexDirection: 'row',
  },

  imageContainer: {
    marginLeft: 5,
    width: 130,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  image: {
    height: 130,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  details: {
    width: '60%',
    marginLeft: 5,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    width: '80%',
  },
  darkName: {
    color: COLORS.gray5,
    fontSize: SIZES.medium,
    fontWeight: '700',
  },
  lightName: {
    color: COLORS.gray2,
    fontWeight: '700',
    fontSize: SIZES.medium,
  },
  darkCloseBtn: {
    backgroundColor: COLORS.gray6,
    marginEnd: 5,
    padding: 3,
    borderRadius: SIZES.xxSmall,
    marginTop: 2,
  },
  lightCloseBtn: {
    backgroundColor: COLORS.gray4,
    marginEnd: 5,
    padding: 3,
    borderRadius: SIZES.xxSmall,
    marginTop: 2,
  },
  quantityWrapper: {
    flexDirection: 'row',
  },
  dContainer: {
    width: '40%',
  },
  darkDTxt: {
    color: COLORS.gray5,
    fontWeight: '500',
  },
  lightDTxt: {
    color: COLORS.gray2,
    fontWeight: '500',
  },
  darkQuantity: {
    color: COLORS.gray5,
    fontWeight: '500',
  },
  lightQuantity: {
    color: COLORS.gray2,
    fontWeight: '500',
  },
  priceWrapper: {
    flexDirection: 'row',
  },
  darkPrice: {
    color: COLORS.gray5,
    fontWeight: '500',
  },
  lightPrice: {
    color: COLORS.gray2,
    fontWeight: '500',
  },
  subWrapper: {
    flexDirection: 'row',
  },
  darkSubTxt: {
    color: COLORS.gray5,
    fontWeight: '900',
  },
  lightSubTxt: {
    color: COLORS.gray2,
    fontWeight: '900',
  },
  darkSubtotal: {
    color: COLORS.gray5,
    fontWeight: '900',
  },
  lightSubtotal: {
    color: COLORS.gray2,
    fontWeight: '900',
  },
  changeBtnContainer: {
    width: '80%',
    alignItems: 'center',
  },
  darkChangeBtn: {
    borderWidth: 0.5,
    borderColor: COLORS.primary1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: SIZES.medium,
    alignSelf: 'center',
  },
  lightChangeBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondary1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: SIZES.medium,
    alignSelf: 'center',
  },
  darkChangeBtnTxt: {
    color: COLORS.primary1,
    fontWeight: '600',
  },
  lightChangeBtnTxt: {
    color: COLORS.secondary1,
    fontWeight: '600',
  },
  darkChangeAmountWrapper: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: COLORS.gray5,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.xxSmall,
    borderWidth: 0.2,
  },
  lightChangeAmountWrapper: {
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: COLORS.gray2,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xxSmall,
    borderWidth: 0.2,
  },
  lightInput: {
    width: 140,
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
