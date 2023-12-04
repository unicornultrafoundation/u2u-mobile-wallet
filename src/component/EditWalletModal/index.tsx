import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import U2ULogo from '../../asset/icon/u2u_wallet_icon.png';
import Text from '../Text';
import { getDefaultWalletName, shortenAddress } from '../../util/string';
import Separator from '../Separator';
import theme from '../../theme';
import Modal from '../Modal';
import React, { useEffect, useRef, useState } from 'react';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useWallet } from '../../hook/useWallet';
import { useTranslation } from 'react-i18next';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  onCancelEdit: () => void;
}

const EditWalletModal = ({ onRequestClose, visible, onCancelEdit }: Props) => {
  const { getWalletMetadata, editingWallet, updateWallet } = useWallet();
  const [name, setName] = useState('');
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const inputRef = useRef<TextInput>(null);

  const handleUpdateWallet = () => {
    updateWallet(name.trim())
    setName('')
    onRequestClose();
  };
  const handleCancelEdit = () => {
    onRequestClose()
    setName('')
    onCancelEdit()
  };

  useEffect(() => {
    if (visible) {
      setName(getWalletMetadata(editingWallet).name)
      inputRef.current?.focus();
    }
  }, [visible]);

  if (!editingWallet) {
    return null;
  }

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View
        style={{
          width: 280,
          padding: 24,
          alignItems: 'center',
          backgroundColor: preferenceTheme.background.surface,
          borderRadius: 16,
          shadowColor: 'rgba(0, 0, 0, 0.50)',
          shadowOffset: {
            width: 5,
            height: 4,
          },
          shadowOpacity: 13,
        }}>
        <Image source={U2ULogo} style={{ width: 40, height: 40 }}/>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 0,
            fontSize: 20,
            letterSpacing: 0.38,
            color: preferenceTheme.text.title,
            textAlign: 'center',
          }}
          maxLength={250}
          onChangeText={text => setName(text)}
          placeholderTextColor={preferenceTheme.text.disabled}
          value={name}
          placeholder={
            !getWalletMetadata(editingWallet)?.name
              ? getDefaultWalletName(editingWallet)
              : ''
          }
          ref={inputRef}
        />
        <Text type="caption1-regular" color="disabled">
          {shortenAddress(editingWallet.address, 6, 6)}
        </Text>

        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          onPress={handleUpdateWallet}
          style={{ width: '100%', alignItems: 'center' }}>
          <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
            {t('done')}
          </Text>
        </TouchableOpacity>

        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          style={{ width: '100%', alignItems: 'center' }}
          onPress={handleCancelEdit}>
          <Text type="label-medium" color="disabled">
            {t('cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditWalletModal;
