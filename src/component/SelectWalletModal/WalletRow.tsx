import React from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import Jazzicon from 'react-native-jazzicon';
import Text from '../Text';
import { Wallet } from '../../state/wallet';
import { shortenAddress } from '../../util/string';
import Icon from '../Icon';
import styles from './styles';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../hook/useWallet';


interface Props extends ViewProps {
  item: Wallet;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const WalletRow = ({ item, selected, disabled, onSelect, onEdit, onDelete, ...rest }: Props) => {
  const { getWalletMetadata, generatedPath } = useWallet()
  const { t } = useTranslation<string>();

  const optionStyles = {
    optionsContainer: {
      padding: 24,
      borderRadius: 8,
      backgroundColor: '#181818',
      shadowColor: 'rgba(0, 0, 0, 0.50)',
      width: 220,
      shadowOffset: {
        width: 5,
        height: 4
      },
      shadowRadius: 0,
    },
    optionWrapper: {
      paddingHorizontal: 16,
      paddingVertical: 12
    },
    optionTouchable: {
      underlayColor: '#FFFFFF',
      activeOpacity: 100,
    },
  }

  const handleSelectMenuAction = (value: number) => {
    if (value === 1) {
      onEdit()
    }
    if (value === 2) {
      onDelete()
    }
  }

  return (
    <View style={styles.walletRowContainer} {...rest}>
      <TouchableOpacity
        onPress={onSelect}
        disabled={disabled}
        style={{ flexDirection: 'row', gap: 8, flex: 1, alignItems: 'center' }}>
        <Jazzicon size={34} address={item.address}/>
        <View style={{flex: 1, gap: 2, marginLeft: 5}}>
          <Text type="caption1-medium" color="title">
            {getWalletMetadata(item)?.name || `Address ${item.path[item.path.length - 1]}`}
          </Text>
          <Text type="caption1-regular" color="primary">
            {shortenAddress(item.address, 10, 10)}
          </Text>
        </View>
      </TouchableOpacity>


      <Menu onSelect={handleSelectMenuAction}>
        <MenuTrigger>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            {selected && <Icon name="success" width={24} height={24}/>}
            <Icon name="vertical-dot" width={24} height={24}/>
          </View>
        </MenuTrigger>
        <MenuOptions customStyles={optionStyles}>
          <MenuOption value={1}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text color="title">
                {t('editWallet')}
              </Text>
              <Icon name="edit" width={24} height={24}/>
            </View>
          </MenuOption>
          <MenuOption value={2}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: 'red' }}>
                {t('removeAddress')}
              </Text>
              <Icon name="trash" width={24} height={24}/>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default WalletRow;
