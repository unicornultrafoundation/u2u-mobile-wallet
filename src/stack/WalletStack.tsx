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
import SignExternalRequestScreen from '../screen/SignExternalRequestScreen';
import SessionApprovalScreen from '../screen/SessionApprovalScreen';
import NotificationScreen from '../screen/NotificationScreen';
import ConnectedSessionScreen from '../screen/ConnectedSessionScreen';
import SessionDetailScreen from '../screen/SessionDetail';
import ChatDashboardScreen from '../screen/ChatDashboardScreen';
import ChatSettingScreen from '../screen/ChatSettingScreen';
import BlockedContactScreen from '../screen/BlockedContactScreen';
import ArchivedConversationsScreen from '../screen/ArchivedConversationsScreen';
import ContactListScreen from '../screen/ContactListScreen';
import ContactDetailScreen from '../screen/ContactDetailScreen';
import ChatDetailScreen from '../screen/ChatDetailScreen';

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
      <WalletStack.Screen name="Notification" component={NotificationScreen} />
      {/* SESSION SCREENS */}
      <WalletStack.Screen name="SessionApproval" component={SessionApprovalScreen} />
      <WalletStack.Screen name="SignExternalRequest" component={SignExternalRequestScreen} />
      <WalletStack.Screen name="ConnectedSession" component={ConnectedSessionScreen} />
      <WalletStack.Screen name="SessionDetail" component={SessionDetailScreen} />
      {/* CHAT SCREENS */}
      <WalletStack.Screen name="ChatDashboard" component={ChatDashboardScreen} />
      <WalletStack.Screen name="ChatSetting" component={ChatSettingScreen} />
      <WalletStack.Screen name="BlockedContact" component={BlockedContactScreen} />
      <WalletStack.Screen name="ArchivedConversations" component={ArchivedConversationsScreen} />
      <WalletStack.Screen name="ContactList" component={ContactListScreen} />
      <WalletStack.Screen name="ContactDetail" component={ContactDetailScreen} />
      <WalletStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </WalletStack.Navigator>
  );
}

export default WalletStackScreen;