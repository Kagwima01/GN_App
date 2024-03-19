import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {SIZES, COLORS} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {removeSaveItem} from '../redux/actions/savedActions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SavedItem = ({product}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductScreen', {id: product.id})}>
      <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{uri: `${product.image}`}} style={styles.image} />
          </View>
          <View style={styles.details}>
            <View style={styles.upperRow}>
              <View style={styles.priceWrapper}>
                <Text style={isDarkMode ? styles.darkPrice : styles.lightPrice}>
                  ksh {product.sellingPrice}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={
                    isDarkMode ? styles.darkCloseBtn : styles.lightCloseBtn
                  }
                  onPress={() => dispatch(removeSaveItem(product.id))}>
                  <MaterialCommunityIcons
                    name={'close'}
                    size={25}
                    color={isDarkMode ? COLORS.gray5 : COLORS.gray1}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.upperRow}>
              <View style={styles.categoryWrapper}>
                <Text
                  style={
                    isDarkMode ? styles.darkCategory : styles.lightCategory
                  }>
                  {product.category}
                </Text>
              </View>
              <View style={styles.nameWrapper}>
                <Text style={isDarkMode ? styles.darkName : styles.lightName}>
                  {product.name}
                </Text>
              </View>
            </View>
            <View style={styles.badgeWrapper}>
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
                  style={isDarkMode ? styles.darkInBadge : styles.lightInBadge}>
                  <Text
                    style={isDarkMode ? styles.darkInText : styles.lightInText}>
                    IN Stock
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.descriptionWrapper}>
              <Text
                style={
                  isDarkMode ? styles.darkDescription : styles.lightDescription
                }>
                {product.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SavedItem;

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
    marginLeft: 5,
    marginTop: 5,
    width: '60%',
  },

  upperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'flex-start',
  },
  priceWrapper: {
    minWidth: '43%',
  },
  darkPrice: {
    fontWeight: '900',
    color: COLORS.primary1,
    fontSize: SIZES.medium,
  },
  lightPrice: {
    fontWeight: '900',
    color: COLORS.secondary1,
    fontSize: SIZES.medium,
  },
  darkCloseBtn: {
    backgroundColor: COLORS.gray6,
    marginEnd: 5,
    padding: 4,
    borderRadius: SIZES.xxSmall,
  },
  lightCloseBtn: {
    backgroundColor: COLORS.gray4,
    marginEnd: 5,
    padding: 4,
    borderRadius: SIZES.xxSmall,
  },
  categoryWrapper: {
    maxWidth: '40%',
    marginTop: 5,
  },
  darkCategory: {
    color: COLORS.gray5,
    fontWeight: '500',
  },
  lightCategory: {
    color: COLORS.gray2,
    fontWeight: '500',
  },
  nameWrapper: {
    marginEnd: 5,
  },
  darkName: {
    color: COLORS.gray5,
    fontWeight: '700',
  },
  lightName: {
    color: COLORS.gray2,
    fontWeight: '700',
  },
  badgeWrapper: {
    marginTop: SIZES.xxSmall,
  },
  darkNewBadge: {
    paddingHorizontal: 10,
    backgroundColor: '#9AE6B4',
    width: 50,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  lightNewBadge: {
    paddingHorizontal: 10,
    backgroundColor: '#9AE6B4',
    width: 50,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
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
    paddingHorizontal: 5,
    backgroundColor: '#FC8181',
    width: 130,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  lightOutBadge: {
    paddingHorizontal: 5,
    backgroundColor: '#FC8181',
    width: 150,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
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
    paddingHorizontal: 10,
    backgroundColor: '#2A4365',
    width: 100,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  lightInBadge: {
    paddingHorizontal: 10,
    backgroundColor: '#63B3ED',
    width: 100,
    paddingVertical: 3,
    borderRadius: SIZES.xxSmall,
    alignItems: 'center',
  },
  darkInText: {
    fontWeight: '700',
    color: '#3182CE',
  },
  lightInText: {
    fontWeight: '700',
    color: '#2C5282',
  },
  descriptionWrapper: {
    marginTop: SIZES.xxSmall,
  },
  darkDescription: {
    color: COLORS.gray5,
    fontWeight: '700',
  },
  lightDescription: {
    color: COLORS.gray2,
    fontWeight: '700',
  },
});
