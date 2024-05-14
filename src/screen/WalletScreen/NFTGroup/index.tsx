import { View } from "react-native"
import { Image } from 'react-native';
import { NFTCollectionGroups } from "../../../hook/useSupportedNFT"
import Text from '../../../component/Text';
import Collapsible from '../../../component/Collapsible';
import { useMemo, useState } from "react";
import { usePreferenceStore } from "../../../state/preferences";
import { darkTheme, lightTheme } from "../../../theme/color";
import NFTRow from "../NFTRow";
import { useMultipleTokenBalance } from "../../../hook/useTokenBalance";
import { formatNumberString } from "../../../util/string";

export default function NFTGroups({groupItem}: {
  groupItem: NFTCollectionGroups
}) {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const [open, setOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState("");

  const nftsBalance = useMultipleTokenBalance(
    groupItem.collections.map((i) => {
      return {
        tokenAddress: i.id,
        decimals: 0
      }
    })
  )

  const dataWithBalance = useMemo(() => {
    return groupItem.collections.filter((i) => {
      const balanceItem = nftsBalance.find((item) => item.address === i.id)
      if (!balanceItem) return false
      return balanceItem.balance !== "0"
    })
  }, [groupItem, nftsBalance])

  const totalGroupBalance = useMemo(() => {
    return nftsBalance.reduce((pre, cur) => {
      return pre + Number(cur.balance)
    }, 0)
  }, [nftsBalance])

  const handleExpandItem = (id: string) => {
    if (id === expandedItem) {
      setExpandedItem("");
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <Collapsible
      // open={expandedItem === id}
      open={open}
      handler={() => setOpen(!open)}
      style={{
        backgroundColor: open ? preferenceTheme.background.surfaceHover : preferenceTheme.background.surface,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 12
      }}
      expandedSection={
        <View>
          {dataWithBalance.map((i) => {
            return (
              <NFTRow
                key={`nft-${i.id}`}
                nftCollection={i}
                open={expandedItem === i.id}
                handleExpandItem={handleExpandItem}
              />
            )
          })}
        </View>
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* <Image
            source={{ uri: groupItem.image }}
            width={28}
            height={28}
            alt=""
            borderRadius={14}
          /> */}
          <Text
            style={{ fontSize: 14, fontWeight: '500', letterSpacing: 0.06 }}>
            {groupItem.name}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: preferenceTheme.text.primary, fontSize: 14 }}>
            {formatNumberString(totalGroupBalance.toString())}
          </Text>
        </View>
      </View>
    </Collapsible>
  )
}