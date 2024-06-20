import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomBottomTab from "../component/CustomBottomTab";
import DiscoverStackScreen from "./DiscoverStack";
import EcosystemStackScreen from "./EcosystemStack";
import WalletStackScreen from "./WalletStack";
import StakingStackScreen from "./StakingStack";
import SettingStackScreen from "./SettingStack";
import { useRemoteConfig } from "../hook/useRemoteConfig";
import DeviceInfo from "react-native-device-info";
import { useNotifications } from "../hook/useNotifications";

const Tab = createBottomTabNavigator();

export default function MainTabNav() {
  useNotifications()
  const {remoteConfig} = useRemoteConfig()

  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}) => <CustomBottomTab state={state} descriptors={descriptors} navigation={navigation} />}
      screenOptions={{ headerShown: false }}
      initialRouteName='WalletStack'
    >
      <Tab.Screen name="DiscoverStack" component={DiscoverStackScreen} />
      {
        remoteConfig && remoteConfig.versionInReview === DeviceInfo.getVersion() ? (
          null
        ) : (
          <Tab.Screen name="EcosystemStack" component={EcosystemStackScreen} />
        )
      }
      <Tab.Screen name="WalletStack" component={WalletStackScreen} />
      <Tab.Screen name="StakingStack" component={StakingStackScreen} />
      {/* <Tab.Screen name="MoreStack" component={MoreStackScreen} /> */}
      <Tab.Screen name="SettingStack" component={SettingStackScreen} />
    </Tab.Navigator>
  )
}