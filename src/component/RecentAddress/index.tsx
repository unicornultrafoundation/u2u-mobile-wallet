import React from 'react'
import Collapsible from '../Collapsible';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text'
import { useLocalStore } from '../../state/local';
import { shortenAddress } from '../../util/string';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../hook/usePreference';

const RecentAddress = ({onItemClick}: {
  onItemClick: (item: string) => void
}) => {
  const { recentAddress } = useLocalStore()
  const {preferenceTheme} = usePreference()
  
  const { t } = useTranslation()

  if (recentAddress.length === 0) return null

  return (
    <Collapsible
      expandedSection={
        <View>
          {recentAddress.map((address: string) => (
            <TouchableOpacity
              onPress={() => onItemClick(address)}
            >
              <Text
                key={`recent-address-${address}`}
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {shortenAddress(address, 12, 12)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <Text
          style={[
            theme.typography.label.medium,
            {
              color: preferenceTheme.text.secondary
            }
          ]}
        >
          {t('recentAddress')}
        </Text>
      </View>
    </Collapsible>
  )
}

export default RecentAddress;
