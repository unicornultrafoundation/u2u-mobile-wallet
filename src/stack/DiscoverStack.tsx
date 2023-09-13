import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';

const DiscoverStack = createNativeStackNavigator();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <DiscoverStack.Screen name="Home" component={HomeScreen} />
    </DiscoverStack.Navigator>
  );
}

export default DiscoverStackScreen