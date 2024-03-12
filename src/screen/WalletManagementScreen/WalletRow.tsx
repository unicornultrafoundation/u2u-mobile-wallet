import React, { useState } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import Jazzicon from 'react-native-jazzicon';
import { Wallet } from '../../state/wallet';
import { getDefaultWalletName, shortenAddress } from '../../util/string';
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { styles } from "./styles";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useTranslation } from 'react-i18next';
import { useWallet } from '../../hook/useWallet';
import ConfirmationModal from '../../component/ConfirmationModal';
import { useNavigation } from '@react-navigation/native';

interface Props extends ViewProps {
  item: Wallet;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const WalletRow = ({ item, selected, disabled, onSelect, onEdit, onDelete, ...rest }: Props) => {
  const navigation = useNavigation<any>()
  const { getWalletMetadata, generatedPath } = useWallet()
  const { t } = useTranslation<string>();

  const [visible, setVisible] = useState(false)

  const optionStyles = {
    optionsContainer: styles.optionsContainer,
    optionWrapper: styles.optionWrapper,
    optionTouchable: styles.optionTouchable,
  }

  const handleSelectMenuAction = (value: number) => {
    if (value === 1) {
      onEdit()
    }
    if (value === 2) {
      navigation.navigate('ExportPrivateKey', {wallet: item})
    }
    if (value === 3) {
      setVisible(true)
      // onDelete()
    }
  }
  
  return (
    <>
      <View style={styles.walletRowContainer} {...rest}>
        <TouchableOpacity
          onPress={onSelect}
          disabled={disabled}
          style={{ flexDirection: 'row', gap: 8, flex: 1, alignItems: 'center' }}>
          <Jazzicon size={34} address={item.address}/>
          <View style={{flex: 1, gap: 2, marginLeft: 5}}>
            <Text type="caption1-medium" color="title">
              {getWalletMetadata(item)?.name || getDefaultWalletName(item)}
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
                <Text color="title">
                  {t('exportPrivateKey')}
                </Text>
                <Icon name="lock" color='#8D8D8D' width={24} height={24}/>
              </View>
            </MenuOption>
            <MenuOption value={3}>
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
      <ConfirmationModal 
        visible={visible} 
        message={t('msgAreYouSureToDeleteWallet')}
        description={getWalletMetadata(item)?.name || getDefaultWalletName(item)}
        onCancel={() => {setVisible(false)}}
        onConfirm={() => {
          onDelete()
          setVisible(false)
        }}
      />
    </>
  );
};

export default WalletRow;
