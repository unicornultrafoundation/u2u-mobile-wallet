import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComingSoonScreen from '../screen/ComingSoonScreen';

const MoreStack = createNativeStackNavigator();

const MoreStackScreen = () => {
  return (
    <MoreStack.Navigator
      initialRouteName="ComingSoon"
      screenOptions={{ headerShown: false }}
    >
      <MoreStack.Screen name="ComingSoon" component={ComingSoonScreen} />
    </MoreStack.Navigator>
  );
}

export default MoreStackScreen