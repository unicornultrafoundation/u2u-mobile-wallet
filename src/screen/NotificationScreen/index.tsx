import { SafeAreaView, TouchableOpacity, View } from "react-native";
import Icon from "../../component/Icon";
import Text from '../../component/Text';
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { usePreference } from "../../hook/usePreference";
import { useGlobalStore } from "../../state/global";
import { useCallback, useState } from "react";
import { useNotifications } from "../../hook/useNotifications";
import WarningModal from "./WarningModal";
import Tab from "../../component/Tab";
import AllNoti from "./AllNoti";
import UnreadNoti from "./UnreadNoti";
import theme from "../../theme";
import { typography } from "../../theme/typography";

export default function NotificationScreen() {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  
  const {preferenceTheme} = usePreference()
  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );
  const {markAsRead, refetchNoti, countUnread} = useNotifications()
  const [tab, setTab] = useState('all');
  const tabs = [
    { label: t('all'), value: 'all' },
    { 
      label: `${t('unread')} (${countUnread})`,
      value: 'unread',
      renderLabel: (isActive: boolean) => {
        return (
          <>
            <Text
              style={[
                typography.label2.medium,
                {color: isActive ? theme.color.primary[500] : theme.color.neutral[500]},
                {fontWeight: isActive ? '700' : '500'},
                {marginRight: 6}
              ]}
            >
              {t('unread')}
            </Text>
            {countUnread > 0 && (
              <View
                style={{
                  backgroundColor: isActive ? '#D8F2FF' : '#F4F4F4',
                  minWidth: 30,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={[
                    typography.caption2.medium,
                    {
                      color: isActive ? '#0050B3' : '#ACACAC'
                    }
                  ]}
                >
                  {countUnread}
                </Text>
              </View>
            )}
          </>
        )
      }
    },
  ];

  const [modalVisible, setModalVisible] = useState(false)

  const handleMarkAllRead = async () => {
    await markAsRead()
    refetchNoti()
    setModalVisible(false)
  }

  const handleChangeTab = (t: string) => {
    setTab(t);
  };

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{t('notifications')}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="double-check" width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Tab
          tabs={tabs}
          selectedTab={tab}
          onChange={handleChangeTab}
          tabStyle={{
            // borderColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingLeft: 0,
            paddingRight: 0,
          }}
          tabTextStyle={typography.label2.medium}
          containerStyle={{
            // borderColor: 'transparent',
            marginBottom: 16,
            gap: 12
          }}
        />
      </View>
      {
        tab === 'all' && (
          <AllNoti />
        )
      }
      {
        tab === 'unread' && (
          <UnreadNoti />
        )
      }
      <WarningModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleMarkAllRead}
      />
    </SafeAreaView>
  )
}