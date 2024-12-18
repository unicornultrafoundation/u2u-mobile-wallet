import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import styles from './styles';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
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
import CustomBottomSheetModal from '../CustomBottomSheetModal';

const SelectWalletModal = ({ trigger }: { trigger: () => JSX.Element }) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [editWalletModalVisible, setEditWalletModalVisible] = useState(false);
  const [showAddWalletOptions, setShowAddWalletOptions] = useState(false)
  const { t } = useTranslation<string>();

  const {
    generatedPath,
    seedPhrase,
    wallet,
    generateNewPath,
    savePathIndex,
    setEditingWallet,
    deleteWallet,
    walletOrder,
    setWalletOrder
  } = useWallet();
  const [loading, setLoading] = useState(false);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%'], []);

  // callbacks
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  
  const walletList = useMemo(() => {
    return generatedPath.map(path => {
      return getWalletFromMnemonic(seedPhrase, path);
    });
  }, [generatedPath]);

  const sortedWalletList = useMemo(() => {
    if (walletOrder.length === 0) return walletList
    return walletList.sort((a, b) => {
      const indexA = walletOrder.findIndex((i) => i === a.address)
      const indexB = walletOrder.findIndex((i) => i === b.address)
      return indexA - indexB
    })

  }, [walletList, walletOrder])

  useEffect(() => {
    if (walletOrder.length === 0) {
      const tempOrder = walletList.map((i) => i.address)
      setWalletOrder(tempOrder)
    }
  }, [walletOrder, walletList])

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

  const renderTriggerModal = () => {
    return (
      <BottomSheetView
        style={[
          styles.contentContainer,
        ]}>
        {loading && (
          <BottomSheetView
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
          </BottomSheetView>
        )}
        <BottomSheetScrollView style={{ flex: 1 }} bounces={false}>
          {sortedWalletList.map(item => {
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
      </BottomSheetView>
    )
  }

  return (
    <>
      <CustomBottomSheetModal
        modalRef={bottomSheetModalRef}
        title={'manageWallet'}
        trigger={trigger()}
        triggerModal={renderTriggerModal()}
        snapPoints={snapPoints}
      />
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
