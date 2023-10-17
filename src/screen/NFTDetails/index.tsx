import { SafeAreaView } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import NFTScreenBanner from "./Banner";

const NFTDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <NFTScreenBanner/>


    </SafeAreaView>
  );
};

export default NFTDetailsScreen;
