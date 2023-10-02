import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screen/WalletScreen';
import TokenDetailScreen from '../screen/TokenDetailScreen';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Wallet"
      screenOptions={{ headerShown: false }}
    >
      <WalletStack.Screen name="Wallet" component={WalletScreen} />
      <WalletStack.Screen name="TokenDetail" component={TokenDetailScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen