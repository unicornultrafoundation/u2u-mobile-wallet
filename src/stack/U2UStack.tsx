import { createNativeStackNavigator } from '@react-navigation/native-stack';
import U2UEcoDashboardScreen from '../screen/U2UEcoDashboardScreen';

const U2UStack = createNativeStackNavigator();

const U2UStackScreen = () => {
  return (
    <U2UStack.Navigator
      initialRouteName="U2UEcoDashboard"
      screenOptions={{ headerShown: false }}
    >
      <U2UStack.Screen name="U2UEcoDashboard" component={U2UEcoDashboardScreen} />
    </U2UStack.Navigator>
  );
}

export default U2UStackScreen