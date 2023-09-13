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
import DiscoverStackScreen from './src/stack/DiscoverStack';
import CustomBottomTab from './src/component/CustomBottomTab';
import WalletStackScreen from './src/stack/WalletStack';
import BrowserStackScreen from './src/stack/BrowserStack';
import EcosystemStackScreen from './src/stack/EcosystemStack';
import StakingStackScreen from './src/stack/StakingStack';

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
          <Tab.Screen name="DiscoverStack" component={DiscoverStackScreen} />
          <Tab.Screen name="EcosystemStack" component={EcosystemStackScreen} />
          <Tab.Screen name="WalletStack" component={WalletStackScreen} />
          <Tab.Screen name="StakingStack" component={StakingStackScreen} />
          <Tab.Screen name="BrowserStack" component={BrowserStackScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
