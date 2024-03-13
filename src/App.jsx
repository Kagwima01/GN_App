//react native
import {StyleSheet, StatusBar, useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

//react
import React from 'react';
import {useEffect} from 'react';

//components
import BottomTab from './components/BottomTab';

//screens
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SearchScreen from './screens/SearchScreen';
import SalesScreen from './screens/SalesScreen';
import OutOfStockScreen from './screens/OutOfStockScreen';
import ProductScreen from './screens/ProductScreen';
import FeaturedScreen from './screens/FeaturedScreen';
import CategoryScreen from './screens/CategoryScreen';
import BrandScreen from './screens/BrandScreen';
import UpdateProductScreen from './screens/UpdateProductScreen';

//redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {COLORS} from './constants';

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  {
    isDarkMode
      ? SystemNavigationBar.setNavigationColor(COLORS.gray3)
      : SystemNavigationBar.setNavigationColor(COLORS.gray6);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={isDarkMode ? COLORS.black : COLORS.gray6} />

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Bottom navigation"
              component={BottomTab}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Featured"
              component={FeaturedScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Category"
              component={CategoryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Brand"
              component={BrandScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ProductScreen"
              component={ProductScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Sales"
              component={SalesScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OutOfStock"
              component={OutOfStockScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UpdateProduct"
              component={UpdateProductScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
