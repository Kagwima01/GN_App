import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS, SIZES} from '../constants';
import {useColorScheme} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import InfoScreen from '../screens/InfoScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 15,
          backgroundColor: isDarkMode ? '#4a5568cb' : '#a0aec093',
          marginVertical: 5,
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60,
          width: SIZES.width - 10,
          marginHorizontal: 5,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ProductListScreen}
        options={{
          tabBarLabel: 'List',

          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'list' : 'list-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarLabel: 'Products',

          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'apps' : 'apps-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'account-box' : 'account-box-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{
          tabBarLabel: 'Info',
          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
            paddingBottom: 10,
          },
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'information' : 'information-outline'}
              color={isDarkMode ? COLORS.primary1 : COLORS.secondary1}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
