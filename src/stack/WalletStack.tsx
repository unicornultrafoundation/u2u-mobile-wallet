import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screen/WalletScreen';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Wallet"
      screenOptions={{ headerShown: false }}
    >
      <WalletStack.Screen name="Wallet" component={WalletScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen