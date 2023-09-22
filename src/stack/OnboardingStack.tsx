import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screen/OnboardingScreen';
import CreateWalletScreen from '../screen/CreateWalletScreen';

const OnboardingStack = createNativeStackNavigator();

const OnboardingStackScreen = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
      <OnboardingStack.Screen name="CreateWallet" component={CreateWalletScreen} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingStackScreen