import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '../screen/DiscoverScreen';
import NewsDetailScreen from '../screen/NewsDetailScreen';

export type DiscoverStackParamList = {
  Home: { defaultTab: string };
  NewsDetails: { id: number };
};

const DiscoverStack = createNativeStackNavigator<DiscoverStackParamList>();

const DiscoverStackScreen = () => {
  return (
    <DiscoverStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="Home" component={DiscoverScreen} initialParams={{ defaultTab: 'featured' }}/>
      <DiscoverStack.Screen name="NewsDetails" component={NewsDetailScreen}/>
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackScreen;
