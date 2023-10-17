import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screen/WalletScreen';
import TokenDetailScreen from '../screen/TokenDetailScreen';
import ReceiveTokenScreen from '../screen/ReceiveTokenScreen';
import SendTokenScreen from '../screen/SendTokenScreen';
import NFTCollectionDetailsScreen from '../screen/NFTCollectionDetails';
import NFTDetailsScreen from '../screen/NFTDetails';

const WalletStack = createNativeStackNavigator();

const WalletStackScreen = () => {
  return (
    <WalletStack.Navigator
      initialRouteName="Wallet"
      screenOptions={{ headerShown: false }}
    >
      <WalletStack.Screen name="Wallet" component={WalletScreen} />
      <WalletStack.Screen name="TokenDetail" component={TokenDetailScreen} />
      <WalletStack.Screen name="ReceiveToken" component={ReceiveTokenScreen} />
      <WalletStack.Screen name="SendToken" component={SendTokenScreen} />
      <WalletStack.Screen name="NFTCollections" component={NFTCollectionDetailsScreen} />
      <WalletStack.Screen name="NFTDetails" component={NFTDetailsScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen;