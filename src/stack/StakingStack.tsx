import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StakingDashboardScreen from '../screen/StakingDashboardScreen';

const StakingStack = createNativeStackNavigator();

const StakingStackScreen = () => {
  return (
    <StakingStack.Navigator
      initialRouteName="StakingDashboard"
      screenOptions={{ headerShown: false }}
    >
      <StakingStack.Screen name="StakingDashboard" component={StakingDashboardScreen} />
    </StakingStack.Navigator>
  );
}

export default StakingStackScreen