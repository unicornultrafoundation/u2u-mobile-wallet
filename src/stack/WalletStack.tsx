import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screen/SettingScreen';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <WalletStack.Screen name="Setting" component={SettingScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen