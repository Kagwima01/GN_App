import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';

const ItemListComponent = ({name}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Items', {name})}>
      <View style={isDarkMode ? styles.darkBtn : styles.lightBtn}>
        <Text style={isDarkMode ? styles.darkTxt : styles.lightTxt}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemListComponent;

const styles = StyleSheet.create({
  darkBtn: {
    alignSelf: 'center',
    width: '98%',
    backgroundColor: COLORS.gray1,
    marginVertical: 2,
    borderRadius: SIZES.xxSmall,
    paddingVertical: 8,
  },
  lightBtn: {
    alignSelf: 'center',
    width: '98%',
    backgroundColor: COLORS.gray7,
    marginVertical: 2,
    borderRadius: SIZES.xxSmall,
    paddingVertical: 8,
  },
  darkTxt: {
    fontWeight: '600',
    color: COLORS.gray5,
    marginLeft: 10,
    fontSize: SIZES.medium,
  },
  lightTxt: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: SIZES.medium,
  },
});
