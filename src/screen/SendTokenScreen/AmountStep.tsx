import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const AmountStep = ({onNextStep, onBack}: {
  onNextStep: () => void;
  onBack: () => void;
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme
  const {t} = useTranslation<string>()

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('setAmountForTransaction')}</Text>
        </View>
        <View />
      </View>
    </View>
  )
};

export default AmountStep;
