import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screen/OnboardingScreen';

const OnboardingStack = createNativeStackNavigator();

const OnboardingStackScreen = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen name="Onboarding" component={OnboardingScreen} />
    </OnboardingStack.Navigator>
  );
}

export default OnboardingStackScreen