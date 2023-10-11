import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from '../../component/Icon';
import { styles } from './styles';
import Text from '../../component/Text';
import { useTranslation } from 'react-i18next';

const SetAmountStepHeader = ({handleBack}: {
  handleBack: () => void
}) => {
  const { t } = useTranslation<string>()

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleBack}>
        <Icon name="arrow-left" width={24} height={24} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.headerTokenSymbolText}>{t('setAmountTitle')}</Text>
      </View>
      <View />
    </View>
  )
}

export default SetAmountStepHeader;
