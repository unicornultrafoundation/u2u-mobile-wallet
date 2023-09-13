import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DappDashboardScreen from '../screen/DappDashboardScreen';

const BrowserStack = createNativeStackNavigator();

const BrowserStackScreen = () => {
  return (
    <BrowserStack.Navigator
      initialRouteName="DappDashboard"
      screenOptions={{ headerShown: false }}
    >
      <BrowserStack.Screen name="DappDashboard" component={DappDashboardScreen} />
    </BrowserStack.Navigator>
  );
}

export default BrowserStackScreen