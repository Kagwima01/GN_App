//react
import React from 'react';
import {useEffect, useState} from 'react';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//react native
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useColorScheme} from 'react-native';
import {useRoute} from '@react-navigation/native';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {getProduct} from '../redux/actions/productActions';
import {addSaveItem} from '../redux/actions/savedActions';
import {addSalesItem} from '../redux/actions/salesActions';
import {deleteProduct} from '../redux/actions/adminActions';

import {COLORS, SIZES} from '../constants';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const AmountSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, 'Least amount is 1 piece')
    .required('Amount is required'),
});

const ProductScreen = () => {
  const route = useRoute();
  const {id} = route.params;
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const {loading, error, product} = useSelector(state => state.product);
  const {salesItems} = useSelector(state => state.sales);
  const {favorites} = useSelector(state => state.save);
  const [amount, setAmount] = useState(1);
  const {userInfo} = useSelector(state => state.user);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const addItem = () => {
    if (salesItems.some(item => item.id === id)) {
      salesItems.find(item => {
        item.id === id;
        setAmount((item.qty += 1));
        dispatch(addSalesItem(id, (item.qty += 1)));
        showSalesItemUpdatedToast();
      });
    } else {
      dispatch(addSalesItem(id, amount));
      showItemAddedToSalesToast();
    }
  };

  const showItemAddedToSalesToast = () => {
    ToastAndroid.show('Item has been added.', ToastAndroid.SHORT);
  };
  const showSalesItemUpdatedToast = () => {
    ToastAndroid.show('Item has been updated.', ToastAndroid.SHORT);
  };

  const saveItem = () => {
    if (favorites.some(saveItem => saveItem.id === id)) {
      showItemAlreadyInFavoritesToast();
    } else {
      dispatch(addSaveItem(id));
      showItemSavedToast();
    }
  };

  const deleteItemHandler = id => {
    Alert.alert('Delete Product', 'Are you sure to Delete this Product? ', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Delete',
        onPress: () => {},
      },
    ]);
  };

  const showItemDeletedToast = () => {
    ToastAndroid.show('Item has been Deleted.', ToastAndroid.SHORT);
  };

  const showItemSavedToast = () => {
    ToastAndroid.show('Item has been Saved.', ToastAndroid.SHORT);
  };
  const showItemAlreadyInFavoritesToast = () => {
    ToastAndroid.show('Item already in your favorites.', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={SIZES.xxLarge}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
          />
        </View>
      ) : error ? (
        <View>
          <Text style={isDarkMode ? styles.darkTError : styles.lightTError}>
            We are Sorry!
          </Text>
          <Text style={isDarkMode ? styles.darkError : styles.lightError}>
            {error}
          </Text>
        </View>
      ) : (
        product && (
          <ScrollView style={styles.scroll}>
            <View
              style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
              <View style={styles.lightUpperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons
                    name="chevron-left-circle"
                    size={35}
                    color={COLORS.secondary1}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => saveItem()}>
                  <MaterialCommunityIcons
                    name={
                      favorites.some(saveItem => saveItem.id === product._id)
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={35}
                    color={COLORS.secondary1}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.carouselContainer}>
                <SliderBox
                  images={product.images}
                  dotColor={COLORS.secondary1}
                  inactiveDotColor={COLORS.gray4}
                  imageLoadingColor={COLORS.secondary1}
                  ImageComponentStyle={{
                    width: '80%',
                    marginTop: 5,
                    height: 270,
                    objectFit: 'contain',
                  }}
                  circleLoop
                />
              </View>

              <View
                style={isDarkMode ? styles.darkDetails : styles.lightDetails}>
                <View style={styles.badgeRow}>
                  {product.stock === 0 ? (
                    <View
                      style={
                        isDarkMode ? styles.darkOutBadge : styles.lightOutBadge
                      }>
                      <Text
                        style={
                          isDarkMode ? styles.darkOutText : styles.lightOutText
                        }>
                        OUT OF STOCK
                      </Text>
                    </View>
                  ) : product.productIsNew ? (
                    <View
                      style={
                        isDarkMode ? styles.darkNewBadge : styles.lightNewBadge
                      }>
                      <Text
                        style={
                          isDarkMode ? styles.darkNewText : styles.lightNewText
                        }>
                        New
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={
                        isDarkMode ? styles.darkInBadge : styles.lightInBadge
                      }>
                      <Text
                        style={
                          isDarkMode ? styles.darkInText : styles.lightInText
                        }>
                        IN Stock
                      </Text>
                    </View>
                  )}
                  {userInfo === null ? (
                    <></>
                  ) : (
                    userInfo.isAdmin && (
                      <View
                        style={
                          isDarkMode ? styles.darkStock : styles.lightStock
                        }>
                        <Text
                          style={
                            isDarkMode
                              ? styles.darkStockTxt
                              : styles.lightStockTxt
                          }>
                          {product.stock}
                        </Text>
                      </View>
                    )
                  )}
                </View>
                <View style={styles.lightTitleRow}>
                  <View style={styles.nameRow}>
                    <View style={styles.nameWrapper}>
                      <Text
                        style={
                          isDarkMode ? styles.darkBrand : styles.lightBrand
                        }>
                        {product.brand}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={isDarkMode ? styles.darkName : styles.lightName}>
                        {product.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.priceWrapper}>
                    <View style={styles.wrap}>
                      <Text
                        style={
                          isDarkMode ? styles.darkKText : styles.lightKText
                        }>
                        Ksh
                      </Text>
                    </View>
                    <View style={styles.wrap}>
                      <Text
                        style={
                          isDarkMode ? styles.darkPrice : styles.lightPrice
                        }>
                        {product.sellingPrice}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={
                          isDarkMode ? styles.darkPText : styles.lightPText
                        }>
                        per piece
                      </Text>
                    </View>
                  </View>
                  <View style={styles.categoryWrapper}>
                    <Text
                      style={
                        isDarkMode ? styles.darkCategory : styles.lightCategory
                      }>
                      {product.category}
                    </Text>
                  </View>
                  <View style={styles.descriptionWrapper}>
                    <Text
                      style={
                        isDarkMode
                          ? styles.darkDescription
                          : styles.lightDescription
                      }>
                      {product.description}
                    </Text>
                  </View>
                </View>
                {userInfo === null ? (
                  <></>
                ) : (
                  userInfo.isAdmin && (
                    <View
                      style={isDarkMode ? styles.darkSales : styles.lightSales}>
                      <View style={styles.quantityWrapper}>
                        <Text
                          style={
                            isDarkMode ? styles.darkQText : styles.lightQText
                          }>
                          Quantity:
                        </Text>
                        <Text
                          style={
                            isDarkMode ? styles.darkAmount : styles.lightAmount
                          }>
                          ({amount}) Piece
                        </Text>
                      </View>
                      <Formik
                        initialValues={{amount: ''}}
                        validationSchema={AmountSchema}
                        onSubmit={values => setAmount(values.amount)}>
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
                          <View>
                            <View style={styles.wrapper}>
                              <Text
                                style={
                                  isDarkMode
                                    ? styles.darkLabel
                                    : styles.lightLabel
                                }>
                                Quantity
                              </Text>
                              <View
                                style={
                                  isDarkMode
                                    ? styles.darkChangeAmountWrapper
                                    : styles.lightChangeAmountWrapper
                                }>
                                <View style={styles.lightInput}>
                                  <TextInput
                                    onFocus={() => {
                                      setFieldTouched('amount');
                                    }}
                                    onBlur={() => setFieldTouched('amount', '')}
                                    placeholder="How many pieces sold..."
                                    keyboardType="numeric"
                                    value={values.amount}
                                    onChangeText={handleChange('amount')}
                                  />
                                </View>
                                <TouchableOpacity
                                  style={styles.changeInputBtn}
                                  disabled={!isValid}
                                  onPress={handleSubmit}>
                                  <Text style={styles.ChangeInputBtnTxt}>
                                    Save
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              {touched.amount && errors.amount && (
                                <Text style={styles.errorMessage}>
                                  {errors.amount}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      </Formik>

                      <View style={styles.lightDelivery}>
                        <Text
                          style={
                            isDarkMode ? styles.darkNBTxt : styles.lightNBTxt
                          }>
                          A random NB
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={
                          isDarkMode
                            ? styles.darkBtnSales
                            : styles.lightBtnSales
                        }
                        onPress={() => addItem()}
                        disabled={product.stock <= 0}>
                        <Text
                          style={
                            isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt
                          }>
                          {product.stock <= 0 ? 'OUT OF STOCK' : 'Add to Sales'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                )}
                {userInfo === null ? (
                  <></>
                ) : (
                  userInfo.isSuperAdmin && (
                    <View style={styles.btnWrapper}>
                      <View>
                        <TouchableOpacity
                          style={
                            isDarkMode
                              ? styles.darkBtnUpdate
                              : styles.lightBtnUpdate
                          }
                          onPress={
                            () =>
                              navigation.navigate('UpdateProduct', {product})
                            //console.log(product)
                          }>
                          <Text
                            style={
                              isDarkMode
                                ? styles.darkBtnUTxt
                                : styles.lightBtnUTxt
                            }>
                            Update Item
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={
                            isDarkMode
                              ? styles.darkBtnDelete
                              : styles.lightBtnDelete
                          }
                          onPress={() => deleteItemHandler()}>
                          <Text
                            style={
                              isDarkMode
                                ? styles.darkBtnDTxt
                                : styles.lightBtnDTxt
                            }>
                            Delete Product
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                )}
              </View>
            </View>
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: COLORS.gray2,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  darkTError: {
    color: COLORS.gray5,
    fontSize: SIZES.large,
    fontWeight: '900',
    alignSelf: 'center',
    marginTop: 20,
  },
  lightTError: {
    color: COLORS.gray2,
    marginTop: 20,
    fontSize: SIZES.large,
    fontWeight: '900',
    alignSelf: 'center',
  },
  lightError: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    alignSelf: 'center',
    color: COLORS.gray1,
  },
  darkError: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    alignSelf: 'center',
  },

  lightUpperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.large,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  carouselContainer: {
    flex: 1,
    width: '100%',
    height: 350,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 15,
  },

  lightDetails: {
    marginTop: -SIZES.large,
    paddingBottom: 5,
    backgroundColor: COLORS.gray7,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    height: SIZES.height - 40,
  },
  darkDetails: {
    marginTop: -SIZES.large,
    paddingBottom: 5,
    backgroundColor: COLORS.gray2,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    height: SIZES.height - 40,
  },
  darkNewBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#9AE6B4',
    width: 70,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  lightNewBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#9AE6B4',
    width: 70,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  darkNewText: {
    fontWeight: '700',
    color: '#276749',
  },
  lightNewText: {
    fontWeight: '700',
    color: '#276749',
  },
  darkOutBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FC8181',
    width: 150,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  lightOutBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FC8181',
    width: 150,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  darkOutText: {
    fontWeight: '700',
    color: '#9B2C2C',
  },
  lightOutText: {
    fontWeight: '700',
    color: '#9B2C2C',
  },
  darkInBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2A4365',
    width: 100,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  lightInBadge: {
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2A4365',
    width: 100,
    paddingVertical: 5,
    borderRadius: SIZES.xSmall,
    alignItems: 'center',
  },
  darkInText: {
    fontWeight: '700',
    color: '#3182CE',
  },
  lightInText: {
    fontWeight: '700',
    color: '#3182CE',
  },
  lightTitleRow: {
    flexDirection: 'column',
    top: 10,
    width: SIZES.width - 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameWrapper: {
    maxWidth: SIZES.width - 150,
  },
  darkName: {
    fontWeight: '900',
    fontSize: SIZES.large,
    color: COLORS.gray5,
  },
  lightName: {
    fontWeight: '900',
    fontSize: SIZES.large,
    color: COLORS.gray2,
  },
  darkBrand: {
    fontWeight: '900',
    fontSize: SIZES.large,
    color: COLORS.gray5,
    marginRight: 10,
  },
  lightBrand: {
    fontWeight: '900',
    fontSize: SIZES.large,
    color: COLORS.gray2,
    marginRight: 10,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  wrap: {
    marginRight: 10,
  },
  darkKText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray5,
  },
  lightKText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray2,
  },
  darkPrice: {
    fontSize: SIZES.large,
    paddingVertical: 2,
    color: COLORS.primary1,
    fontWeight: 'bold',
  },
  lightPrice: {
    fontSize: SIZES.large,
    paddingVertical: 2,
    color: COLORS.secondary1,
    fontWeight: 'bold',
  },
  darkPText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray5,
  },
  lightPText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray2,
  },
  categoryWrapper: {
    marginBottom: 10,
  },
  darkCategory: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray5,
  },
  lightCategory: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray2,
  },

  descriptionWrapper: {
    marginBottom: 10,
  },
  darkDescription: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray5,
  },
  lightDescription: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.gray2,
  },

  darkSales: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray1,
    width: SIZES.width - 20,
    borderRadius: SIZES.small,
  },
  lightSales: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray6,
    width: SIZES.width - 20,
    borderRadius: SIZES.small,
  },
  quantityWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  darkQText: {
    fontWeight: '700',
    fontSize: SIZES.medium,
    color: COLORS.gray5,
    marginRight: 15,
  },
  lightQText: {
    fontWeight: '700',
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginRight: 15,
  },
  darkAmount: {
    fontWeight: '700',
    fontSize: SIZES.medium,
    color: COLORS.gray5,
  },
  lightAmount: {
    fontWeight: '700',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  darkLabel: {
    color: COLORS.gray4,
    fontSize: SIZES.small,
    textAlign: 'left',
  },
  lightLabel: {
    color: COLORS.white,
    fontSize: SIZES.small,
    textAlign: 'left',
  },
  darkNBTxt: {
    fontWeight: '700',
    fontSize: SIZES.small,
    color: COLORS.gray5,
  },
  lightNBTxt: {
    fontWeight: '700',
    fontSize: SIZES.small,
    color: COLORS.white,
  },
  wrapper: {
    marginVertical: 7,
    marginHorizontal: 10,
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
    paddingHorizontal: 20,
  },
  errorMessage: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
    color: COLORS.red,
  },
  lightDelivery: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },

  darkBtnSales: {
    backgroundColor: COLORS.primary1,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  lightBtnSales: {
    backgroundColor: COLORS.secondary1,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  darkBtnTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  lightBtnTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  btnWrapper: {
    alignSelf: 'center',
  },
  darkBtnUpdate: {
    borderColor: COLORS.primary1,
    borderWidth: 0.5,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  lightBtnUpdate: {
    borderColor: COLORS.secondary1,
    borderWidth: 1,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  darkBtnUTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.primary1,
  },
  lightBtnUTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.secondary1,
  },
  darkBtnDelete: {
    backgroundColor: COLORS.red,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  lightBtnDelete: {
    backgroundColor: COLORS.red,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  darkBtnDTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.gray2,
  },
  lightBtnDTxt: {
    fontWeight: '900',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //width:SIZES.w
    justifyContent: 'space-between',
  },
  darkStock: {
    backgroundColor: COLORS.primary1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
    marginRight: 20,
  },
  lightStock: {
    backgroundColor: COLORS.secondary1,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.xxSmall,
    marginRight: 20,
  },
  darkStockTxt: {
    color: COLORS.gray2,
    fontWeight: '900',
    fontSize: SIZES.medium,
  },
  lightStockTxt: {
    color: COLORS.gray5,
    fontWeight: '900',
    fontSize: SIZES.medium,
  },
});
