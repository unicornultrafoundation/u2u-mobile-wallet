import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Jazzicon from 'react-native-jazzicon'
import Text from '../Text';
import { Wallet } from '../../state/wallet'
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { shortenAddress } from '../../util/string';
import Icon from '../Icon';

const WalletRow = ({item, selected, showMenu, toggleMenu}: {
  item: Wallet;
  selected: boolean;
  showMenu: boolean;
  toggleMenu: () => void
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <>
      <Jazzicon size={34} address={item.address} />
      <Text
        style={[
          theme.typography.label.bold,
          {
            color: preferenceTheme.text.title,
            marginLeft: 8,
            flex: 1
          }
        ]}
      >
        {shortenAddress(item.address, 10, 10)}
      </Text>
      <View style={{flexDirection: 'row', gap: 2}}>
        {selected && (
          <Icon name="success" width={24} height={24} />
        )}
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="vertical-dot" width={24} height={24} />
        </TouchableOpacity>
      </View>
      {showMenu && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 40,
            padding: 24
          }}
        >
          <Text>123</Text>
        </View>
      )}
    </>
  )
}

export default WalletRow;
