import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const COLORS = {
  primary1: '#63B3ED',
  secondary1: '#3182CE',
  gray1: '#2D3748',
  gray2: '#1A202C',
  gray3: '#171923',
  gray4: '#A0AEC0',
  gray5: '#EDF2F7',
  gray6: '#4A5568',
  gray7: '#E2E8F0',
  red: '#E53E3E',

  offwhite: '#F3F4F8',
  white: '#FFFFFF',
  black: '#000000',
  lightWhite: '#FAFAFC',
};

const SIZES = {
  xxSmall: 5,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export {COLORS, SIZES, SHADOWS};
