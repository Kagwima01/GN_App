import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addSaveItem} from '../redux/actions/savedActions';

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.save);
  const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';

  const showItemSavedToast = () => {
    ToastAndroid.show('Item has been Saved.', ToastAndroid.SHORT);
  };

  const showItemAlreadyInFavoritesToast = () => {
    ToastAndroid.show('Item already in your favorites.', ToastAndroid.SHORT);
  };

  const saveItem = id => {
    if (favorites.some(saveItem => saveItem.id === id)) {
      showItemAlreadyInFavoritesToast();
    } else {
      dispatch(addSaveItem(id));
      showItemSavedToast();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductScreen', {id: product._id})}>
      <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${product.images[0]}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.productDetails}>
          <View>
            <Text
              style={
                isDarkMode ? styles.productNameDark : styles.productNameLight
              }
              numberOfLines={1}>
              {product.name}
            </Text>
            <View style={styles.category}>
              <Text
                style={
                  isDarkMode ? styles.darkCategoryTxt : styles.lightCategoryTxt
                }>
                {product.category}
              </Text>
            </View>
            <View style={styles.firstRow}>
              <View style={styles.pricing}>
                <Text
                  style={
                    isDarkMode ? styles.darkPriceTxt : styles.lightPriceTxt
                  }>
                  Ksh
                </Text>
                <Text style={isDarkMode ? styles.darkPrice : styles.lightPrice}>
                  {product.sellingPrice}
                </Text>
              </View>

              <TouchableOpacity onPress={() => saveItem(product._id)}>
                <MaterialCommunityIcons
                  name={
                    favorites.some(saveItem => saveItem.id === product._id)
                      ? 'bookmark'
                      : 'bookmark-outline'
                  }
                  size={30}
                  color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  darkContainer: {
    width: SIZES.width / 2 - 15,
    marginEnd: 18,
    borderRadius: SIZES.xxSmall,
    borderColor: COLORS.gray4,
    borderStyle: 'solid',
    borderWidth: 0.5,
    elevation: 10,
    backgroundColor: COLORS.gray2,
  },
  lightContainer: {
    width: SIZES.width / 2 - 15,
    marginEnd: 18,
    borderRadius: SIZES.xxSmall,
    elevation: 10,
    backgroundColor: COLORS.white,
  },

  imageContainer: {
    flex: 1,
    width: SIZES.width / 2 - 24,
    alignSelf: 'center',
    marginTop: SIZES.small / 2,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  productNameDark: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.offwhite,
    alignSelf: 'center',
  },
  productNameLight: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.black,
    alignSelf: 'center',
  },

  pricing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    alignSelf: 'center',
  },
  darkCategoryTxt: {
    color: COLORS.gray4,
    fontWeight: '600',
  },
  lightCategoryTxt: {
    color: COLORS.gray4,
    fontWeight: '600',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  darkPriceTxt: {
    color: COLORS.gray5,
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '600',
  },
  lightPriceTxt: {
    color: COLORS.gray6,
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '600',
  },
  darkPrice: {
    color: COLORS.primary1,
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 5,
  },
  lightPrice: {
    color: COLORS.secondary1,
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 5,
  },
});
