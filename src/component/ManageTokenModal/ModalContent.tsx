import React, { useState } from 'react'
import { FlatList, View } from 'react-native';
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

const ModalContent = () => {
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation()
  const {supportedTokens} = useSupportedTokens()
  const {customTokenList} = useLocalStore()

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <View style={[
      styles.contentContainer,
      {
        backgroundColor: preferenceTheme.background.background
      }
    ]}>
      <Text
        style={[
        theme.typography.headline.medium,
        {
          color: preferenceTheme.text.title,
          marginBottom: 16
        }
      ]}>
        {t('manageToken')}
      </Text>
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
            <View
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
            </View>
          )
        }}
      />
      <Separator style={{width: '100%'}} />
      <FlatList
        data={[...supportedTokens, ...customTokenList].filter((t: Record<string, any>) => t.address.includes(searchQuery) || t.symbol.includes(searchQuery) || t.name.includes(searchQuery))}
        renderItem={({item}) => {
          return (
            <TokenRow tokenObj={item} />
          )
        }}
        style={{width: '100%'}}
      />
    </View>
  )
}

export default ModalContent;
