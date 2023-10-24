import React, { useCallback, useRef, useMemo, useState } from 'react'
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import Jazzicon from 'react-native-jazzicon'
import styles from './styles';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { darkTheme, lightTheme } from '../../theme/color';
import { usePreferenceStore } from '../../state/preferences';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';
import Separator from '../Separator';
import { useWallet } from '../../hook/useWallet';
import { getWalletFromMnemonic } from '../../util/wallet';
import { shortenAddress } from '../../util/string';
import WalletRow from './WalletRow';

const SelectWalletModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const { t } = useTranslation<string>()

  const { generatedPath, seedPhrase, wallet, generateNewPath, savePathIndex } = useWallet()
  const [loading, setLoading] = useState(false)
  const [toggleMenuPath, setToggleMenuPath] = useState(0)

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
    // console.log("generatedPath", generatedPath)
    return generatedPath.map((path) => {
      return getWalletFromMnemonic(seedPhrase, path)
    })
  }, [generatedPath])

  const handleCreateWallet = () => {
    setLoading(true)
    setTimeout(() => {
      generateNewPath()
      setLoading(false)
    }, 100)
  }

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
      >
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: preferenceTheme.background.background,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6'
        }}
        backdropComponent={({ style }) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: '#181818',
                  opacity: 0.9,
                }
              ]}
            />
          )
        }}
      >
        <View style={[
          styles.contentContainer,
          {
            backgroundColor: preferenceTheme.background.background
          }
        ]}>
          <Text style={[
            theme.typography.headline.medium,
            {
              color: preferenceTheme.text.title,
              // marginBottom: 28
            }
          ]}>
            {t('manageWallet')}
          </Text>
          <Separator style={{width: '100%'}} />
          <View style={{flex: 1, width: "100%"}}>
            {walletList.map((item) => {
              const selected = wallet.address === item.address
              return (
                <TouchableOpacity
                  key={`network-${item.address}`}
                  style={styles.walletRowContainer}
                  disabled={loading}
                  onPress={() => {
                    setLoading(true)
                    setTimeout(() => {
                      savePathIndex(Number(item.path[item.path.length - 1]))
                      handleClose()
                      setLoading(false)
                    }, 100)
                  }}
                >
                  <WalletRow
                    item={item}
                    selected={selected}
                    showMenu={toggleMenuPath === Number(item.path[item.path.length - 1])}
                    toggleMenu={() => {
                      setToggleMenuPath(Number(item.path[item.path.length - 1]))
                    }}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
          <Separator style={{width: '100%'}} />
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 12}}
            onPress={handleCreateWallet}
            disabled={loading}
          >
            <Icon name="plus" width={18} height={18} />
            <Text
              style={[
                theme.typography.label.medium,
                {
                  color: preferenceTheme.text.title,
                  marginLeft: 4
                }
              ]}
            >
              Create new wallet
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </>
  )
};

export default SelectWalletModal;
