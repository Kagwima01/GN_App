import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../constants';
import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SavedScreen from '../screens/SavedScreen';
import HelpScreen from '../screens/HelpScreen';
import InfoScreen from '../screens/InfoScreen';
import AdminConsoleScreen from '../screens/AdminConsoleScreen';
import ProductsScreen from '../screens/ProductsScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(state => state.user);
  const {userInfo} = user;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isDarkMode ? COLORS.gray3 : COLORS.gray7,
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 55,
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
        name="Products"
        component={ProductsScreen}
        options={{
          tabBarLabel: 'Products',

          tabBarLabelStyle: {
            color: isDarkMode ? COLORS.gray5 : COLORS.black,
            fontWeight: 'bold',
            fontSize: 12,
          },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="apps"
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
