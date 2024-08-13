import { SafeAreaView, TouchableOpacity, View, Image, FlatList, SectionList } from "react-native";
import { useGlobalStore } from "../../state/global";
import { usePreference } from "../../hook/usePreference";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import EMPTY_ILLUS from '../../asset/images/empty_contact_illus.png'
import { styles } from "./styles";
import Icon from "../../component/Icon";
import Text from "../../component/Text";
import { useDebounce } from "../../hook/useDebounce";
import { useContact } from "../../hook/useContact";
import { typography } from "../../theme/typography";
import Button from "../../component/Button";
import TextInput from "../../component/TextInput";
import AddContactModal from "./AddContactModal";
import { groupByAlphabet } from "../../util/object";
import theme from "../../theme";

// TODO: implement alphabet floating list
export default function ContactListScreen() {
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

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const {contactList} = useContact(debouncedSearch)

  const [showAddContact, setShowAddContact] = useState(false)

  const sectionContactList = useMemo(() => {
    return groupByAlphabet(contactList, 'name').map((i) => {
      return {
        title: i.char,
        data: i.items
      }
    })
  }, [contactList])
  
  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('manageListContact')}</Text>
        </View>
        <TouchableOpacity onPress={() => setShowAddContact(true)}>
          <Icon
            name="plus-circle"
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {contactList.length === 0 ? (
          <View style={{width: 243, gap: 14, alignItems: 'center'}}>
            <Image
              source={EMPTY_ILLUS}
              width={200}
            />
            <Text style={[typography.caption1.medium, {color: preferenceTheme.text.secondary, textAlign: 'center'}]}>
              {t('noContactDescription')}
            </Text>
            <Button
              fullWidth
              style={{
                borderRadius: 60,
                marginTop: 10,
              }}
              textStyle={[typography.label.medium]}
              onPress={() => setShowAddContact(true)}
            >
              {t('addContact')}
            </Button>
          </View>
        ) : (
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
            <SectionList
              sections={sectionContactList}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={() => {
                    navigation.navigate('ContactDetail', {address: item.address})
                  }}
                >
                  <View style={{width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.color.primary[500]}}>
                    <Text style={{color: '#FFFFFF'}}>
                      {item.name[0].toUpperCase()}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text type="body-medium" color="title">{item.name}</Text>
                  </View>
                  <TouchableOpacity>
                    <Icon
                      name="chat"
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              renderSectionHeader={({section: {title}}) => (
                <View style={{paddingHorizontal: 16}}>
                  <Text type="subheadline-medium" color="secondary">{title}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
      <AddContactModal
        visible={showAddContact}
        onRequestClose={() => setShowAddContact(false)}
      />
    </SafeAreaView>
  )
}