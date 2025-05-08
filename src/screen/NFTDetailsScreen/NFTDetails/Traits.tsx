import { View } from 'react-native';
import Text from '../../../component/Text';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';

const NFTTraits = ({metadata}: {
  metadata: Record<string, any>
}) => {  
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const traits = metadata.attributes

  if (!traits) {
    return null
  }

  return (
    <View>
      <Text
        style={[
          theme.typography.label.bold,
          {
            color: preferenceTheme.text.title,
            marginBottom: 10,
          }
        ]}>
        {t('properties')}
      </Text>

      <View style={{ gap: 12 }}>
        {traits.map((trait: any) => (
          <View key={trait.trait_type} style={styles.txTraitContainer}>
            <Text
              style={[
                theme.typography.caption2.regular, 
                {
                  flex: 1,
                  color: preferenceTheme.text.secondary, 
                }
              ]}>
              {trait.trait_type}
            </Text>
            <Text style={[
              theme.typography.caption1.medium, 
              {color: preferenceTheme.text.title, textAlign: 'right', maxWidth: '45%'}]}
            >
              {trait.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default NFTTraits;
