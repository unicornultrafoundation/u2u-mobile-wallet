import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screen/SettingScreen';

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={{ headerShown: false }}
    >
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

export default SettingStackScreen