import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProduct, updateProduct} from '../redux/actions/adminActions';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../constants';
import Heading from '../components/Heading';
const UpdateProductScreen = ({navigation}) => {
  const route = useRoute();
  const {product} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  //const {loading} = useSelector(state => state.admin);
  const [name, setName] = useState(product.name);
  const [imageOne, setImageOne] = useState(product.images[0]);
  const [imageTwo, setImageTwo] = useState(product.images[1]);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [buyingPrice, setBuyingPrice] = useState(product.buyingPrice);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice);
  const [stock, setStock] = useState(product.stock);
  const [productIsNew, setProductIsNew] = useState(product.productIsNew);
  const dispatch = useDispatch();

  const showProductUpdatedToast = () => {
    ToastAndroid.show('Product Updated Successfully !', ToastAndroid.SHORT);
  };

  const onSaveProduct = () => {
    dispatch(
      updateProduct(
        product._id,
        name,
        imageOne,
        imageTwo,
        brand,
        category,
        description,
        buyingPrice,
        sellingPrice,
        stock,
        productIsNew,
      ),
    );
    showProductUpdatedToast();
  };
  return (
    <SafeAreaView
      style={isDarkMode ? styles.darkBarkground : styles.lightBackground}>
      <Heading title={'Update Product'} />

      <ScrollView>
        <View style={isDarkMode ? styles.darkWrap : styles.lightWrap}>
          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Name
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              onChangeText={name => setName(name)}
              value={name}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Stock
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              placeholder="Stock"
              value={stock}
              inputMode="numeric"
              onChangeText={stock => setStock(stock)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Selling price
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              value={sellingPrice}
              inputMode="numeric"
              placeholder="Selling price"
              onChangeText={sellingPrice => setSellingPrice(sellingPrice)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Buying price
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              value={buyingPrice}
              inputMode="numeric"
              placeholder="Buying price"
              onChangeText={buyingPrice => setBuyingPrice(buyingPrice)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Category
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              value={category}
              onChangeText={category => setCategory(category)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Description
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              value={description}
              onChangeText={description => setDescription(description)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={isDarkMode ? styles.darkInputL : styles.lightInputL}>
              Brand
            </Text>
            <TextInput
              style={isDarkMode ? styles.darkInput : styles.lightInput}
              value={brand}
              onChangeText={brand => setBrand(brand)}
            />
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={isDarkMode ? styles.darkBtn : styles.lightBtn}
              onPress={onSaveProduct}>
              <Text style={isDarkMode ? styles.darkBtnTxt : styles.lightBtnTxt}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProductScreen;

const styles = StyleSheet.create({
  darkBarkground: {
    backgroundColor: COLORS.gray2,
    height: '100%',
  },
  lightBackground: {
    backgroundColor: COLORS.white,
    height: '100%',
  },
  darkWrap: {
    backgroundColor: COLORS.gray1,
    alignSelf: 'center',
    width: '97%',
    marginVertical: 10,
    borderRadius: SIZES.xxSmall,
    elevation: 10,
  },
  lightWrap: {
    backgroundColor: COLORS.gray7,
    alignSelf: 'center',
    width: '97%',
    marginVertical: 10,
    borderRadius: SIZES.xxSmall,
    elevation: 10,
  },
  inputWrapper: {
    marginHorizontal: 8,
  },
  darkInputL: {
    color: COLORS.gray5,
    fontSize: SIZES.small,
    textAlign: 'left',
    marginLeft: 8,
    marginTop: 20,
    marginVertical: 10,
  },
  lightInputL: {
    color: COLORS.gray1,
    fontSize: SIZES.small,
    textAlign: 'left',
    marginLeft: 8,
    marginTop: 20,
    marginVertical: 10,
  },
  darkInput: {
    backgroundColor: COLORS.gray6,
    height: 40,
    marginHorizontal: 8,
    borderRadius: SIZES.xxSmall,
    paddingHorizontal: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  lightInput: {
    backgroundColor: COLORS.white,
    height: 40,
    marginHorizontal: 8,
    borderRadius: SIZES.xxSmall,
    paddingHorizontal: 10,
    color: COLORS.gray2,
    fontWeight: '600',
  },
  btnWrapper: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  darkBtn: {
    backgroundColor: COLORS.primary1,
    width: SIZES.width - 44,
    paddingVertical: 8,
    borderRadius: SIZES.large,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  lightBtn: {
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
  wrapp: {},
});
