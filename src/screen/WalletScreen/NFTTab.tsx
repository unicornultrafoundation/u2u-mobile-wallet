import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Text from '../../component/Text';
import { NFTCollectionGroups, NFTCollectionMeta, useSupportedNFT } from '../../hook/useSupportedNFT';
import { useGlobalStore } from '../../state/global';
import NFTRow from './NFTRow';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { useMultipleTokenBalance } from '../../hook/useTokenBalance';
import NFTGroups from './NFTGroup';

const NFTTab = ({ collapsed, onResetParentView }: { collapsed: boolean, onResetParentView: () => void; }) => {
  const { t } = useTranslation()
  const [firstTouch, setFirstTouch] = useState(0);
  const { searchKeyword } = useGlobalStore()

  const { supportedNFT: data } = useSupportedNFT()

  const [expandedItem, setExpandedItem] = useState("");

  const flatData = useMemo(() => {
    let rs: NFTCollectionMeta[] = []
    data.forEach((i) => {
      if (i.isGroup) {
        rs = [...rs, ...(i as NFTCollectionGroups).collections]
      } else {
        rs.push(i as NFTCollectionMeta)
      }
    })
    return rs
  }, [data])

  const nftsBalance = useMultipleTokenBalance(
    flatData.map((i) => {
      return {
        tokenAddress: i.id,
        decimals: 0
      }
    })
  )

  const dataWithBalance = useMemo(() => {
    return flatData.filter((i) => {
      const balanceItem = nftsBalance.find((item) => item.address === i.id)
      if (!balanceItem) return false
      return balanceItem.balance !== "0"
    })
  }, [flatData, nftsBalance])

  const handleExpandItem = (id: string) => {
    if (id === expandedItem) {
      setExpandedItem("");
    } else {
      setExpandedItem(id);
    }
  };

  // Handle Swipe event
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y <= 0 && firstTouch == 0 && collapsed) {
      if (!Boolean(searchKeyword)) {
        onResetParentView();
      }
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setFirstTouch(e.nativeEvent.contentOffset.y);
  };

  if (collapsed) {
    const filteredNFTs = dataWithBalance.filter((i) => {
      return (
        (i.name as string).toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
    return <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
        minHeight: 500,
        paddingHorizontal: 16
      }}
      onScrollBeginDrag={e => onScrollBeginDrag(e)}
      onScrollEndDrag={e => onScrollEndDrag(e)}
    >
      {filteredNFTs.length === 0 ? (
        <View style={styles.containerNoNFT}>
          <Image source={require('../../asset/images/ic_no_nft.png')} style={styles.imageNoNFT} resizeMode="contain" />
          <Text style={styles.textNoNFT}>{t(Boolean(searchKeyword) ? 'No NFTs found' : 'There is no NFTs yet')}</Text>
        </View>
      ) : (
        // If array is not empty, display list
        filteredNFTs.map(
          (item) => (
            <NFTRow key={`nft-${item.id}`} nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />
          )
        )
      )}
    </ScrollView>

  } else {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        {/* <Dropdown
          containerStyle={{ marginBottom: 16 }}
          renderList={<Text style={{ color: 'white' }}>List</Text>}>
          <Text style={{ color: preferenceTheme.text.title, fontSize: 14 }}>
            All collectibles
          </Text>
        </Dropdown> */}

        {(dataWithBalance ?? []).length == 0 && (
          <View style={styles.containerNoNFT}>
            <Image source={require('../../asset/images/ic_no_nft.png')} style={styles.imageNoNFT} resizeMode="contain" />
            <Text style={styles.textNoNFT}> {t('There is no NFTs yet')}</Text>
          </View>
        )}

        {data.map((item) => {
          if (item.isGroup) {
            return (
              <NFTGroups groupItem={item as NFTCollectionGroups} />
            )
          } else {
            const itemWithBalance = dataWithBalance.find((i) => i.id === (item as NFTCollectionMeta).id)
            if (!itemWithBalance) return null
            return (
              <NFTRow
                key={`nft-${itemWithBalance.id}`}
                nftCollection={itemWithBalance}
                open={expandedItem === itemWithBalance.id}
                handleExpandItem={handleExpandItem}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 12
                }}
              />
            )
          }
        })}

        {/* {dataWithBalance.map((item) => {
          return <NFTRow key={`nft-${item.id}`} nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />
        })} */}
        {/* <FlatList
          nestedScrollEnabled={true}
          style={{ minHeight: 500 }}
          onScrollBeginDrag={e => onScrollBeginDrag(e)}
          onScrollEndDrag={e => onScrollEndDrag(e)}
          data={dataWithBalance}
          renderItem={({ item }) => <NFTRow key={`nft-${item.id}`} nftCollection={item} open={expandedItem === item.id} handleExpandItem={handleExpandItem} />}
          keyExtractor={item => item.id}
        /> */}
      </View>
    );
  }

};

export default NFTTab;
