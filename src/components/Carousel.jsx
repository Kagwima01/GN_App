import {StyleSheet, View, useColorScheme, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {COLORS, SIZES} from '../constants';
import {getImages} from '../redux/actions/carouselActions';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UIActivityIndicator} from 'react-native-indicators';
const Carousel = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const dispatch = useDispatch();
  const imageList = useSelector(state => state.carousel);

  const {loading, error, images} = imageList;

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <View style={styles.carouselContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <UIActivityIndicator
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
      ) : images.length === 0 ? (
        <></>
      ) : (
        images && (
          <View>
            <SliderBox
              images={images}
              dotColor={COLORS.secondary1}
              inactiveDotColor={COLORS.gray1}
              backgroundColor={COLORS.white}
              borderRadius={15}
              imageLoadingColor={COLORS.secondary1}
              ImageComponentStyle={{
                objectFit: 'contain',
              }}
              circleLoop
            />
          </View>
        )
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 5,
    height: 200,
    width: SIZES.width - 10,
    marginHorizontal: 5,
    elevation: 10,
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
