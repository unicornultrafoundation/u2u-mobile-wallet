import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { usePreferenceStore } from "../../state/preferences";
import { darkTheme, lightTheme } from "../../theme/color";
import Icon from "../../component/Icon";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Text from "../../component/Text";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalStore } from "../../state/global";
import { typography } from "../../theme/typography";
import Separator from "../../component/Separator";
import WalletRow from "./WalletRow";
import { useWallet } from "../../hook/useWallet";
import { getWalletFromMnemonic, getWalletFromPrivateKey } from "../../util/wallet";
import { getPathIndex } from "../../util/string";
import Toast from "react-native-toast-message";
import { Wallet } from "../../state/wallet";
import EditWalletModal from "../../component/EditWalletModal";

export default function WalletManagementScreen() {
  const navigation = useNavigation<any>()
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [loading, setLoading] = useState(false);
  const [editWalletModalVisible, setEditWalletModalVisible] = useState(false);
  const [walletList, setWalletList] = useState<{
    address: string;
    privateKey: string;
    mnemonic: string;
    path: string;
  }[]>([])

  const {t} = useTranslation()

  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {
    generatedPath,
    seedPhrase,
    wallet,
    generateNewPath,
    savePathIndex,
    savePKIndex,
    setEditingWallet,
    deleteWallet,
    walletOrder,
    setWalletOrder,
    privateKeys,
    removePrivateKey
  } = useWallet();

  // const walletList = useMemo(() => {
  //   return generatedPath.map(path => {
  //     return getWalletFromMnemonic(seedPhrase, path);
  //   });
  // }, [generatedPath]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const value = generatedPath.map(path => {
        return getWalletFromMnemonic(seedPhrase, path);
      })

      privateKeys.forEach((key) => {
        value.push({
          ...getWalletFromPrivateKey(key),
          mnemonic: '',
          path: ''
        })
      })

      setWalletList(value)
      setLoading(false)
    }, 100)
  }, [generatedPath, privateKeys])

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
    // bottomSheetModalRef.current?.close();
    setEditingWallet(w)
    setTimeout(() => {
      setEditWalletModalVisible(true);
    }, 10)
  };

  const handleDeleteWallet = (w: Wallet) => {
    if (generatedPath.length === 1 && w.path !== '') {
      Toast.show({
        type: 'error',
        text1: t('removeWalletFail'),
        text2: t('removeWalletFailDescription'),
      })
      return
    }

    setLoading(true)
    setTimeout(() => {
      if (w.path === '') {
        removePrivateKey(w.privateKey)
      } else {
        deleteWallet(w)
      }
      // bottomSheetModalRef.current?.close();
      setLoading(false)
    }, 100)
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={24}
    >
      <View
        style={styles.header}
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <Text
          style={[
            typography.title3.bold,
            {
              color: preferenceTheme.text.primary
            }
          ]}
        >
          {t('manageWallet')}
        </Text>
        <View />
      </View>
      <ScrollView
        contentContainerStyle={[
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
                  if (item.path !== '') {
                    // Seed mode
                    const idx = getPathIndex(item.path)
                    if (idx == null) {
                      setLoading(false)
                      return
                    }
                    savePathIndex(idx);
                  } else {
                    // PK mode
                    savePKIndex(item.privateKey)
                  }
                  
                  // handleClose();
                  setLoading(false);
                }, 100);
              }}
            />
          );
        })}
        <Separator style={{ width: '100%' }}/>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
            gap: 8,
            width: '100%'
          }}
          onPress={handleCreateWallet}
          disabled={loading}>
          <Icon name="plus" width={24} height={24}/>
          <View style={{flex: 1}}>
            <Text type="body-medium" color="title">
              {t('createNewWallet')}
            </Text>
            <Text type="caption1-medium" color="secondary">
              {t('generateNewU2UWallet')}
            </Text>
          </View>
          <Icon name="chevron-right" width={24} height={24}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 12,
            gap: 8,
            width: '100%'
          }}
          onPress={() => navigation.navigate('ImportWithPrivateKey')}
          disabled={loading}>
          <Icon name="import" width={24} height={24}/>
          <View style={{flex: 1}}>
            <Text type="body-medium" color="title">
              {t('importWallet')}
            </Text>
            <Text type="caption1-medium" color="secondary">
              {t('importWithPrivateKey')}
            </Text>
          </View>
          <Icon name="chevron-right" width={24} height={24}/>
        </TouchableOpacity>
      </ScrollView>
      <EditWalletModal
        visible={editWalletModalVisible}
        onRequestClose={() => {
          setEditWalletModalVisible(false)
          setEditingWallet()
        }}
        onCancelEdit={() => {
          // bottomSheetModalRef.current?.present()
          setEditingWallet()
        }}
      />
    </KeyboardAvoidingView>
  )
}