import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Text from '../../../component/Text';
import theme from '../../../theme';
import Icon from '../../../component/Icon';
import { usePreference } from '../../../hook/usePreference';
import CustomBottomSheetModal from '../../../component/CustomBottomSheetModal';

const LegalModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {preferenceTheme} = usePreference()

  const { t } = useTranslation<string>()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  const handleTermsPress = () => {
    // Xử lý khi người dùng nhấn vào "Terms"
    Linking.openURL('https://docs.u2u.xyz/services/wallets/u2u-super-app/policy');
  };

  const handlePrivacyPress = () => {
    // Xử lý khi người dùng nhấn vào "Privacy Policy"
    Linking.openURL('https://docs.u2u.xyz/services/wallets/u2u-super-app/policy');
  };
  
  return (
    <CustomBottomSheetModal
      modalRef={bottomSheetModalRef}
      title='legal' 
      trigger={trigger()} 
      triggerModal={
        <View>
          <TouchableOpacity style={[styles.settingItem]} onPress={handlePrivacyPress}>
            <Text style={[theme.typography.footnote.medium, {flex: 1}]}>{t('privacyPolicy')}</Text>
            <Icon
              name='chevron-right'
              width={18}
              height={18}
              color={preferenceTheme.text.disabled}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={handleTermsPress}>
            <Text style={[theme.typography.footnote.medium, {flex: 1}]}>{t('termsOfService')}</Text>
            <Icon
              name='chevron-right'
              width={18}
              height={18}
              color={preferenceTheme.text.disabled}
            />
          </TouchableOpacity>
        </View>
      }
      snapPoints={snapPoints}
    />
  )
}

export default LegalModal;