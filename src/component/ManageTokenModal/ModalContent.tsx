import React, { useState } from 'react'
import { FlatList } from 'react-native';
import Text from '../../component/Text';
import styles from './styles';
import theme from '../../theme';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';
import Separator from '../Separator';
import Icon from '../Icon';
import { useSupportedTokens } from '../../hook/useSupportedTokens';
import TokenRow from './TokenRow';
import CustomTokenModal from '../CustomTokenModal';
import { useLocalStore } from '../../state/local';
import { usePreference } from '../../hook/usePreference';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';

const ModalContent = () => {
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation()
  const {supportedTokens} = useSupportedTokens()
  const {customTokenList} = useLocalStore()

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <BottomSheetView style={styles.contentContainer}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchTokenPlaceholder')}
        containerStyle={{width: '100%'}}
      />
      <CustomTokenModal
        triggerStyle={{width: '100%'}}
        trigger={() => {
          return (
            <BottomSheetView
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 14,
              }}
            >
              <Text
                style={[
                  theme.typography.label.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {t('customToken')}
              </Text>
              <Icon
                name="chevron-right"
                width={24}
                height={24}
              />
            </BottomSheetView>
          )
        }}
      />
      <Separator style={{width: '100%'}} />
      <BottomSheetFlatList
        data={[...supportedTokens, ...customTokenList].filter((t: Record<string, any>) => t.address.includes(searchQuery) || t.symbol.includes(searchQuery) || t.name.includes(searchQuery))}
        renderItem={({item}) => {
          return (
            <TokenRow tokenObj={item} />
          )
        }}
        style={{width: '100%'}}
      />
    </BottomSheetView>
  )
}

export default ModalContent;
