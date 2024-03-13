import {
  StyleSheet,
  View,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {COLORS, SIZES} from '../constants';
import {getImages} from '../redux/actions/carouselActions';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
          <ActivityIndicator
            size={SIZES.xxLarge}
            color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
          />
        </View>
      ) : error ? (
        <></>
      ) : images.length === 0 ? (
        <></>
      ) : (
        images && (
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
            //autoplay
            circleLoop
          />
        )
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
