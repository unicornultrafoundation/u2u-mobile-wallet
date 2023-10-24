import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '../screen/DiscoverScreen';

const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="Home" component={DiscoverScreen} />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackScreen;
