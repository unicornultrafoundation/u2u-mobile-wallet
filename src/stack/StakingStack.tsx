import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StakingDashboardScreen from '../screen/StakingDashboardScreen';
import ValidatorDetailScreen from '../screen/ValidatorDetailScreen';
import DelegateScreen from '../screen/DelegateScreen';

const StakingStack = createNativeStackNavigator();

const StakingStackScreen = () => {
  return (
    <StakingStack.Navigator
      initialRouteName="StakingDashboard"
      screenOptions={{ headerShown: false }}
    >
      <StakingStack.Screen name="StakingDashboard" component={StakingDashboardScreen} />
      <StakingStack.Screen name="ValidatorDetail" component={ValidatorDetailScreen} />
      <StakingStack.Screen name="Delegate" component={DelegateScreen} />
    </StakingStack.Navigator>
  );
}

export default StakingStackScreen