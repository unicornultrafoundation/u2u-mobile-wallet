import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screen/OnboardingScreen';
import CreateWalletScreen from '../screen/CreateWalletScreen';
import ImportWalletScreen from '../screen/ImportWalletScreen';

const OnboardingStack = createNativeStackNavigator();

const OnboardingStackScreen = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
      <OnboardingStack.Screen name="CreateWallet" component={CreateWalletScreen} />
      <OnboardingStack.Screen name="ImportWallet" component={ImportWalletScreen} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingStackScreen