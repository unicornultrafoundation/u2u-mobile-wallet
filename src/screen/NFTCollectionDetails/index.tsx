import { View } from 'react-native';
import {styles} from './styles';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';
import CollectionBanner from './Banner';

const NFTCollectionDetailsScreen = () => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: preferenceTheme.background.background},
      ]}>
      <CollectionBanner />
    </View>
  );
};

export default NFTCollectionDetailsScreen;
