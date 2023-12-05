import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import NFTScreenBanner from './Banner';
import Tab from '../../component/Tab';
import NFTDetails from './NFTDetails';
import NFTHistory from './History';
import Button from '../../component/Button';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { getPhonePaddingBottom } from '../../util/platform';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import { OwnedNFT } from '../../hook/useOwnedNFT';
import { useTransaction } from '../../hook/useTransaction';
import { useWallet } from '../../hook/useWallet';
import { useTranslation } from 'react-i18next';
import { parseIPFSFile } from '../../util/string';
import Icon from '../../component/Icon';
import theme from '../../theme';
import ShareNFTModalButton from './Banner/ShareNFTModalButton';
import { Image } from 'react-native';

const NFTDetailsScreen = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [tab, setTab] = useState('details');
  const navigation = useNavigation<any>()

  const {wallet} = useWallet()
  const {setNFTMeta} = useTransaction()

  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const nftCollection: NFTCollectionMeta = route.params?.nftCollection || {}
  const item: OwnedNFT = route.params?.item || {}
  const metadata: Record<string, any> = route.params?.metadata || {}
  const {t} = useTranslation()

  const handleTransfer = () => {
    setNFTMeta({
      nftCollection: nftCollection,
      tokenID: item.tokenID,
      image: metadata.image
    })
    navigation.navigate('SendNFT')
  }

  const isOwner = useMemo(() => {
    if (item.owner.id === wallet.address.toLowerCase()) return true
    return false
  }, [item])

  console.log('isOwner', isOwner)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: preferenceTheme.background.background },
      ]}>
      <View style={styles.section}>
        <View style={[styles.row, {paddingTop: 16, paddingBottom: 16}]}>
          <TouchableOpacity onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
          <Text
            style={[
              theme.typography.title3.bold,
              { flex: 1, textAlign: 'center', color: preferenceTheme.text.title }
            ]}>
            {nftCollection.name} #{item.id}
          </Text>
          <ShareNFTModalButton
            item={item}
            nftCollection={nftCollection}
            metadata={metadata}
          />
        </View>
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 80 }} 
          bounces={false} 
          stickyHeaderIndices={[1]}
        >
          <Image
            source={{ uri: parseIPFSFile(metadata.image) }}
            style={{
              width: '100%',
              aspectRatio: 1.0,
              objectFit: 'cover',
              borderRadius: 16,
              marginTop: 10,
            }}
          />
          <View style={{backgroundColor: preferenceTheme.background.background}}>
            <NFTScreenBanner
              nftCollection={nftCollection}
              item={item}
              metadata={metadata}
            />
            <Tab
              tabs={[
                { label: t('details'), value: 'details' },
                { label: t('history'), value: 'history' },
              ]}
              selectedTab={tab}
              onChange={v => setTab(v)}
              tabStyle={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingLeft: 16,
                paddingRight: 12,
              }}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            {tab === 'details' && <NFTDetails item={item} nftCollection={nftCollection} metadata={metadata} />}
            {tab === 'history' && <NFTHistory/>}
          </View>
        </ScrollView>
      </View>
      {isOwner && (
        <View 
          style={{
            position: 'absolute',
            paddingBottom: getPhonePaddingBottom(),
            paddingTop: 12,
            bottom: 0,
            width: '100%',
            zIndex: 99,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: preferenceTheme.background.background
          }}
        >
          <Button type="fill" style={{width: '90%', borderRadius: 60}} onPress={handleTransfer}>
            {t('transfer')}
          </Button>
        </View>
      )}
    </View>
  );
};

export default NFTDetailsScreen;
