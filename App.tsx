/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "./src/i18n"
import HomeStackScreen from './src/stack/HomeStack';
import CustomBottomTab from './src/component/CustomBottomTab';
import WalletStackScreen from './src/stack/WalletStack';
import DappStackScreen from './src/stack/DappStack';
import U2UStackScreen from './src/stack/U2UStack';
import InvestmentStackScreen from './src/stack/InvestmentStack';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    backgroundColor: '#121212'
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Tab.Navigator
          tabBar={({state, descriptors, navigation}) => <CustomBottomTab state={state} descriptors={descriptors} navigation={navigation} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="HomeStack" component={HomeStackScreen} />
          <Tab.Screen name="DappStack" component={DappStackScreen} />
          <Tab.Screen name="U2UStack" component={U2UStackScreen} />
          <Tab.Screen name="InvestmentStack" component={InvestmentStackScreen} />
          <Tab.Screen name="WalletStack" component={WalletStackScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
