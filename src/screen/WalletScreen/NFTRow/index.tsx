import React from 'react'
import Collapsible from '../../../component/Collapsible';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { Dimensions, ScrollView, View } from 'react-native';
import { Image } from 'react-native';
import Text from '../../../component/Text';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { useURC20TokenBalance } from '../../../hook/useURC20TokenBalance';
import { useWallet } from '../../../hook/useWallet';
import { formatNumberString } from '../../../util/string';

const NFTRow = ({nftCollection, open, handleExpandItem}: {
  nftCollection: NFTCollectionMeta
  open: boolean
  handleExpandItem: (itemID: string) => void
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {wallet} = useWallet()

  const {balance} = useURC20TokenBalance(wallet.address, nftCollection.id, 0)

  return (
    <Collapsible
      key={nftCollection.id}
      // open={expandedItem === id}
      open={open}
      handler={() => handleExpandItem(nftCollection.id)}
      expandedSection={
        <ScrollView
          horizontal
          snapToInterval={Dimensions.get('window').width}
          decelerationRate="fast"
          alwaysBounceVertical
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'nowrap',
            marginBottom: 12,
          }}
        >
          {/* {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={{ width: 111, height: 111 }}
              onPress={() => navigation.navigate('NFTCollection')}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </TouchableOpacity>
          ))} */}
        </ScrollView>
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={{ uri: nftCollection.image }}
            width={28}
            height={28}
            alt=""
            borderRadius={14}
          />
          <Text
            style={{ fontSize: 14, fontWeight: '500', letterSpacing: 0.06 }}>
            {nftCollection.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: preferenceTheme.text.primary, fontSize: 14 }}>
            {formatNumberString(balance)}
          </Text>
        </View>
      </View>
    </Collapsible>
  )
};

export default NFTRow;
