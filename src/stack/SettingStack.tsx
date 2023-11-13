import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screen/SettingScreen';
import ExportSeedPhraseScreen from '../screen/ExportSeedPhraseScreen';

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <SettingStack.Screen name="Setting" component={SettingScreen} />
      <SettingStack.Screen name="ExportSeedPhrase" component={ExportSeedPhraseScreen} />
    </SettingStack.Navigator>
  );
}

export default SettingStackScreen