import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useGlobalStore } from "../../state/global";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { useChatBlockedAddress } from "../../hook/useBlockedContact";
import TextInput from "../../component/TextInput";
import { shortenAddress, truncate } from "../../util/string";
import { typography } from "../../theme/typography";
import Button from "../../component/Button";
import UnblockModal from "./UnblockModal";

export default function BlockedContactScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const {data} = useChatBlockedAddress()
  const allChatBlockedAddress = useMemo(() => {
    if (!data) return []
    return data.pages.flat()
  }, [data])

  const [search, setSearch] = useState('')
  const [showConfirmUnblock, setShowConfirmUnblock] = useState(false)
  const [addressToUnblock, setAddressToUnblock] = useState('')
  
  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('blockedContacts')}</Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1, width: '100%'}}>
          <TextInput
            containerStyle={{height: 48, margin: 16}}
            placeholder={t('Search')}
            placeholderTextColor={'#363636'}
            onChangeText={text => {
              setSearch(text);
            }}
            value={search}
            preIcon={() => {
              return (
                <Icon name="search" width={24} height={24} />
              );
            }}
          />
          <FlatList
            data={allChatBlockedAddress}
            contentContainerStyle={{
              paddingBottom: 24
            }}
            renderItem={({item}) => {
              return (
                <View style={[styles.rowItem, {borderColor: preferenceTheme.outline}]}>
                  <Text style={[typography.body.medium, {color: preferenceTheme.text.title}]}>
                    {shortenAddress(item.walletAddress, 12, 12)}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: preferenceTheme.background.surface,
                      borderRadius: 20,
                      paddingHorizontal: 16,
                      paddingVertical: 8
                    }}
                    onPress={() => {
                      setAddressToUnblock(item.walletAddress);
                      setShowConfirmUnblock(true)
                    }}
                  >
                    <Text>{t('unblock')}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          <View style={{paddingHorizontal: 16}}>
            <Button
              fullWidth
              style={{
                borderRadius: 60,
              }}
              textStyle={[typography.label.medium]}
              // onPress={handleClose}
            >
              {t('addToBlockList')}
            </Button>
          </View>
        </View>
      </View>
      <UnblockModal
        visible={showConfirmUnblock}
        onRequestClose={() => setShowConfirmUnblock(false)}
        addressToUnblock={addressToUnblock}
      />
    </SafeAreaView>
  )
}