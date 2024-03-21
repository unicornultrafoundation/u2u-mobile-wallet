import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screen/WalletScreen';
import TokenDetailScreen from '../screen/TokenDetailScreen';
import ReceiveTokenScreen from '../screen/ReceiveTokenScreen';
import SendTokenScreen from '../screen/SendTokenScreen';
import TransactionDetailScreen from '../screen/TransactionDetailScreen';
import NFTCollectionDetailsScreen from '../screen/NFTCollectionDetailsScreen';
import NFTDetailsScreen from '../screen/NFTDetailsScreen';
import SendNFTScreen from '../screen/SendNFTScreen';
import TxHistoryScreen from '../screen/TxHistoryScreen';
import WalletManagementScreen from '../screen/WalletManagementScreen';
import ImportWithPrivateKeyScreen from '../screen/ImportWithPrivateKeyScreen';
import ExportPrivateKeyScreen from '../screen/ExportPrivateKeyScreen';
import SwapScreen from '../screen/SwapScreen';

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
      <WalletStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <WalletStack.Screen name="TxHistory" component={TxHistoryScreen} />
      <WalletStack.Screen name="NFTCollection" component={NFTCollectionDetailsScreen} />
      <WalletStack.Screen name="NFTDetails" component={NFTDetailsScreen} />
      <WalletStack.Screen name="SendNFT" component={SendNFTScreen} />
      <WalletStack.Screen name="WalletManagement" component={WalletManagementScreen} />
      <WalletStack.Screen name="ImportWithPrivateKey" component={ImportWithPrivateKeyScreen} />
      <WalletStack.Screen name="ExportPrivateKey" component={ExportPrivateKeyScreen} />
      <WalletStack.Screen name="Swap" component={SwapScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen;