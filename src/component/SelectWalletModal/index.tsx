import React, { useCallback, useRef, useMemo, useState } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Text from '../Text';
import { darkTheme, lightTheme } from '../../theme/color';
import { usePreferenceStore } from '../../state/preferences';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Separator from '../Separator';
import { useWallet } from '../../hook/useWallet';
import { getWalletFromMnemonic } from '../../util/wallet';
import WalletRow from './WalletRow';
import EditWalletModal from '../EditWalletModal';
import { Wallet } from '../../state/wallet';
import Toast from 'react-native-toast-message';
import { getPathIndex } from '../../util/string';

const SelectWalletModal = ({ trigger }: { trigger: () => JSX.Element }) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [editWalletModalVisible, setEditWalletModalVisible] = useState(false);
  const { t } = useTranslation<string>();

  const {
    generatedPath,
    seedPhrase,
    wallet,
    generateNewPath,
    savePathIndex,
    setEditingWallet,
    deleteWallet
  } = useWallet();
  const [loading, setLoading] = useState(false);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const walletList = useMemo(() => {
    return generatedPath.map(path => {
      return getWalletFromMnemonic(seedPhrase, path);
    });
  }, [generatedPath]);

  const handleCreateWallet = () => {
    setLoading(true);
    setTimeout(() => {
      generateNewPath();
      setLoading(false);
    }, 100);
  };

  const handleEditWallet = (w: Wallet) => {
    bottomSheetModalRef.current?.close();
    setEditingWallet(w)
    setTimeout(() => {
      setEditWalletModalVisible(true);
    }, 10)
  };

  const handleDeleteWallet = (w: Wallet) => {
    if (generatedPath.length === 1) {
      Toast.show({
        type: 'error',
        text1: t('removeWalletFail'),
        text2: t('removeWalletFailDescription'),
      })
      return
    }

    setLoading(true)
    setTimeout(() => {
      deleteWallet(w)
      bottomSheetModalRef.current?.close();
      setLoading(false)
    }, 100)
  };

  return (
    <>
      <TouchableOpacity onPress={handlePresentModalPress}>
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: preferenceTheme.background.background,
        }}
        handleStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6',
        }}
        backdropComponent={({ style }) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: '#181818',
                  opacity: 0.9,
                },
              ]}
              onTouchEnd={handleClose}
            />
          );
        }}>
        <View
          style={[
            styles.contentContainer,
          ]}>
          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                flex: 1,
                zIndex: 10,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <ActivityIndicator style={{marginRight: 8}} />
              <Text>{t('loading')}...</Text>
            </View>
          )}
          <Text type="headline-medium" color="title">
            {t('manageWallet')}
          </Text>

          <Separator style={{ width: '100%' }}/>

          <BottomSheetScrollView style={{ flex: 1 }}>
            {walletList.map(item => {
              const selected = wallet.address === item.address;
              return (
                <WalletRow
                  key={`network-${item.address}`}
                  item={item}
                  disabled={loading}
                  selected={selected}
                  onEdit={() => handleEditWallet(item)}
                  onDelete={() => handleDeleteWallet(item)}
                  onSelect={() => {
                    setLoading(true);
                    setTimeout(() => {
                      const idx = getPathIndex(item.path)
                      if (idx == null) {
                        setLoading(false)
                        return
                      }
                      savePathIndex(idx);
                      handleClose();
                      setLoading(false);
                    }, 100);
                  }}
                />
              );
            })}
          </BottomSheetScrollView>

          <Separator style={{ width: '100%' }}/>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 12,
              gap: 8,
            }}
            onPress={handleCreateWallet}
            disabled={loading}>
            <Icon name="plus" width={18} height={18}/>
            <Text type="label-medium" color="title">
              {t('createNewWallet')}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>

      <EditWalletModal
        visible={editWalletModalVisible}
        onRequestClose={() => {
          setEditWalletModalVisible(false)
          setEditingWallet()
        }}
        onCancelEdit={() => {
          bottomSheetModalRef.current?.present()
          setEditingWallet()
        }}
      />
    </>
  );
};

export default SelectWalletModal;
