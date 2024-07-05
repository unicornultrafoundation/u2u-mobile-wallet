import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../screen/SettingScreen';
import UpdatePasswordScreen from '../screen/UpdatePasswordScreen';
import ExportSeedPhraseScreen from '../screen/ExportSeedPhraseScreen'
import NotificationSettingScreen from '../screen/NotificationSettingScreen';
import NicknameScreen from '../screen/NicknameScreen';
import ExperimentalSettingScreen from '../screen/ExperimentalSettingScreen';

const SettingStack = createNativeStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="Setting"
      screenOptions={{ headerShown: false }}
    >
      <SettingStack.Screen name="Setting" component={SettingScreen} />
      <SettingStack.Screen name="ExportSeedPhrase" component={ExportSeedPhraseScreen} />
      <SettingStack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
      <SettingStack.Screen name="NotificationSetting" component={NotificationSettingScreen} />
      <SettingStack.Screen name="ExperimentalSetting" component={ExperimentalSettingScreen} />
      <SettingStack.Screen name="Nickname" component={NicknameScreen} />
    </SettingStack.Navigator>
  );
}

export default SettingStackScreen