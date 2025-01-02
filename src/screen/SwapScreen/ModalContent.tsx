import { usePreference } from "@/hook/usePreference";
import Text from "@/component/Text";
import { BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import theme from "@/theme";
import TextInput from "@/component/TextInput";
import { useState } from "react";
import { useDexTokens } from "@/hook/swap/useDexTokens";
import TokenRow from "./TokenRow";

export default function ModalContent({onSelect}: {
  onSelect: (token: Record<string, any>) => void;
}) {
  const {preferenceTheme} = usePreference()
  const {t} = useTranslation()
  const {data: allTokens} = useDexTokens()

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <BottomSheetView
      style={[
        styles.contentContainer,
        {
          backgroundColor: preferenceTheme.background.background,
        }
      ]}
    >
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={t('searchTokenPlaceholder')}
        containerStyle={{width: '100%', marginTop: 12}}
      />
      <BottomSheetFlatList
        data={allTokens.filter((t: Record<string, any>) => t.address.includes(searchQuery.toLowerCase()) || t.symbol.includes(searchQuery.toLowerCase()) || t.name.includes(searchQuery.toLowerCase()))}
        renderItem={({item}) => {
          return (
            <TokenRow tokenObj={item} onPress={() => onSelect(item)} />
          )
        }}
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{
          paddingBottom: 60,
          paddingTop: 24
        }}
      />
    </BottomSheetView>
  )
}