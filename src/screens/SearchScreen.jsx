import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import ProductCard from '../components/ProductCard';
import {getSearchProducts} from '../redux/actions/searchActions';
import {useColorScheme} from 'react-native';
import Heading from '../components/Heading';

const SearchScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();
  const {loading, error, search} = useSelector(state => state.search);

  const searchForItem = key => {
    dispatch(getSearchProducts(key));
    //console.log(search);
  };
  return (
    <SafeAreaView style={isDarkMode ? styles.darkWrapper : styles.lightWrapper}>
      <Heading title={'Search'} />
      <View
        style={
          isDarkMode ? styles.darkSearchContainer : styles.lightSearchContainer
        }>
        <View style={styles.searchWrapper}>
          <TextInput
            style={
              isDarkMode ? styles.darkSearchInput : styles.lightSearchInput
            }
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Search from GN Cyclemart..."
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={e => {
              e.preventDefault();
              searchForItem(searchKey);
            }}
            disabled={searchKey === ''}>
            <MaterialCommunityIcons
              name="magnify"
              size={35}
              color={isDarkMode ? COLORS.gray5 : COLORS.gray1}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scroll}>
        {loading ? (
          <ActivityIndicator
            size={SIZES.xxLarge}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
          />
        ) : error ? (
          <>
            <Text style={isDarkMode ? styles.darkTError : styles.lightTError}>
              We are Sorry!
            </Text>
            <Text style={isDarkMode ? styles.darkError : styles.lightError}>
              {error}
            </Text>
          </>
        ) : search.length === 0 ? (
          <View>
            <Text style={isDarkMode ? styles.darkHeader : styles.lightHeader}>
              No items found
            </Text>
            <Image
              source={require('../../assets/images/Pose23.png')}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              data={search}
              keyExtractor={item => item._id}
              numColumns={2}
              renderItem={({item}) => <ProductCard product={item} />}
              contentContainerStyle={styles.container}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  lightWrapper: {
    backgroundColor: COLORS.white,
  },
  darkWrapper: {
    backgroundColor: COLORS.gray2,
  },
  darkSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray6,
    justifyContent: 'space-between',
    height: 40,
    width: SIZES.width - 44,
    marginHorizontal: 20,
    borderRadius: SIZES.large,
    marginVertical: SIZES.xSmall,
  },
  lightSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: SIZES.width - 44,
    marginHorizontal: 20,
    borderRadius: SIZES.large,
    marginVertical: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.gray7,
  },
  searchIcon: {
    marginEnd: 20,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  darkSearchInput: {
    paddingHorizontal: SIZES.small,
    width: '100%',
    height: '100%',
    color: COLORS.white,
    fontWeight: '600',
  },
  lightSearchInput: {
    paddingHorizontal: SIZES.small,
    width: '100%',
    height: '100%',
    color: COLORS.gray2,
    fontWeight: '600',
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingTop: SIZES.small,
    paddingLeft: SIZES.small / 4,
  },
  separator: {
    height: 16,
  },
  scroll: {
    height: SIZES.height - 130,
    paddingVertical: 10,
  },
  image: {
    resizeMode: 'contain',
    width: SIZES.width - 80,
    height: SIZES.height - 250,
    opacity: 0.9,
  },
  lightHeader: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
    alignSelf: 'center',
    color: COLORS.gray3,
  },
  darkHeader: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
    alignSelf: 'center',
    color: COLORS.gray5,
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
});
