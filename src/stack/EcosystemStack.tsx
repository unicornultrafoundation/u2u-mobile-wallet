import { createNativeStackNavigator } from '@react-navigation/native-stack';
import U2UEcoDashboardScreen from '../screen/U2UEcoDashboardScreen';
import DAppWebView from '../screen/DAppWebView';

const EcosystemStack = createNativeStackNavigator();

const EcosystemStackScreen = () => {
  return (
    <EcosystemStack.Navigator
      initialRouteName="U2UEcoDashboard"
      screenOptions={{ headerShown: false }}
    >
      <EcosystemStack.Screen name="U2UEcoDashboard" component={U2UEcoDashboardScreen} />
      <EcosystemStack.Screen name="DAppWebView" component={DAppWebView} />
    </EcosystemStack.Navigator>
  );
}

export default EcosystemStackScreen