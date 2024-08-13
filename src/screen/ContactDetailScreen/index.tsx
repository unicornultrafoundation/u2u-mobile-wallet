import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { usePreference } from "../../hook/usePreference";
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import Clipboard from "@react-native-clipboard/clipboard";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useGlobalStore } from "../../state/global";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContact } from "../../hook/useContact";
import theme from "../../theme";
import Separator from "../../component/Separator";
import { shortenAddress } from "../../util/string";
import Toast from "react-native-toast-message";
import BlockModal from "./BlockModal";

export default function ContactDetailScreen() {
  const {t} = useTranslation()
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()
  const route = useRoute<any>();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const address = route.params?.address || ""
  const {contactList, removeContact} = useContact(address)
  const contactItem = contactList[0]

  const [showBlockModal, setShowBlockModal] = useState(false)

  const handleCopy = (value: string) => {
    Clipboard.setString(value);
    Toast.show({
      type: "simpleNoti",
      text1: t('msgCopied'),
      props: {
        width: "45%"
      }
    });
  };

  const handleRemove = () => {
    if (!contactItem) return
    removeContact(contactItem.address)
    navigation.goBack()
  }

  if (!contactItem) return null

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', alignItems: 'center', justifyContent: "center", gap: 12}}>
        <View style={{width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.primary[500]}}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            {contactItem.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Text type="body-medium" color="title">
            {contactItem.name}
          </Text>
          <TouchableOpacity>
            <Icon
              name="edit"
              width={24}
              height={24}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 16, width: '100%'}}>
          <Separator style={{ width: '100%' }}/>
          <View style={{paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text type="headline-medium" color="primary">
              {shortenAddress(contactItem.address, 12, 12)}
            </Text>
            <TouchableOpacity onPress={() => handleCopy(contactItem.address)}>
              <Icon name="copy" width={24} height={24}/>
            </TouchableOpacity>
          </View>
          <Separator style={{ width: '100%' }}/>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}>
            <Icon name="chat" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('chat')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}>
            <Icon name="archived" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('archivedConversations')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}
            onPress={handleRemove}
          >
            <Icon name="trash" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('delete')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionRow, {borderColor: preferenceTheme.divider}]}
            onPress={() => setShowBlockModal(true)}
          >
            <Icon name="block" width={24} height={24} color={preferenceTheme.background.surfaceDisable} />
            <Text type="body-medium" color="title">
              {t('addToBlockList')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BlockModal
        visible={showBlockModal}
        onRequestClose={() => setShowBlockModal(false)}
        addressToBlock={contactItem.address}
      />
    </SafeAreaView>
  )
}