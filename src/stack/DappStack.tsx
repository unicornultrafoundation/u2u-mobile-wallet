import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DappDashboardScreen from '../screen/DappDashboardScreen';

const DappStack = createNativeStackNavigator();

const DappStackScreen = () => {
  return (
    <DappStack.Navigator
      initialRouteName="DappDashboard"
      screenOptions={{ headerShown: false }}
    >
      <DappStack.Screen name="DappDashboard" component={DappDashboardScreen} />
    </DappStack.Navigator>
  );
}

export default DappStackScreen