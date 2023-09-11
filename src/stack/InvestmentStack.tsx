import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InvestmentDashboardScreen from '../screen/InvestmentDashboardScreen';

const InvestmentStack = createNativeStackNavigator();

const InvestmentStackScreen = () => {
  return (
    <InvestmentStack.Navigator
      initialRouteName="InvestmentDashboard"
      screenOptions={{ headerShown: false }}
    >
      <InvestmentStack.Screen name="InvestmentDashboard" component={InvestmentDashboardScreen} />
    </InvestmentStack.Navigator>
  );
}

export default InvestmentStackScreen