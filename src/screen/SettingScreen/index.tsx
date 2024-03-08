import React, { useCallback } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import Text from '../../component/Text';
import { styles } from './styles'
import theme from '../../theme';
import Icon from '../../component/Icon';
import Separator from '../../component/Separator';
import LegalModal from './LegalModal';
import LanguageModal from './LanguageModal';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { usePreference } from '../../hook/usePreference';
import DarkModeToggle from '../../component/DarkModeToggle';

const VERSION = DeviceInfo.getVersion()

const SettingScreen = () => {
  const navigation = useNavigation<any>()
  const {preferenceTheme} = usePreference()

  const { setRouteName } = useGlobalStore();

  const {t} = useTranslation<string>()

  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const renderTrigger = ({icon, title, description} : {
    icon: string,
    title: string,
    description: string
  }) => {
    return (
      <View style={styles.settingItem}>
        <Icon name={icon} width={20} height={20}/>
        <View style={styles.settingItemTextContainer}>
          <Text style={theme.typography.body.medium}>
            {t(title)}
          </Text>
          <Text
            style={[
              theme.typography.caption1.medium,
              {color: preferenceTheme.text.secondary}
            ]}
          >
            {t(description)}
          </Text>
        </View>
        <Icon
          name='chevron-right'
          width={20}
          height={20}
          color={preferenceTheme.text.disabled}
        />
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View style={{marginVertical: 10, gap: 5}}>
        <LegalModal
          trigger={() => {
            return (
              <View style={styles.settingItem}>
                <Text
                    style={[
                      theme.typography.body.medium,
                      {flex: 1}
                    ]}
                  >
                    {t('legal')}
                </Text>
                <Icon
                  name='chevron-right'
                  width={20}
                  height={20}
                  color={preferenceTheme.text.secondary}
                />
              </View>
            )
          }}
        />
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[theme.typography.body.medium, {flex: 1}]}>
            {t('version')}
          </Text>
          <Text
            style={[
              theme.typography.body.medium,
              {color: preferenceTheme.text.secondary}
            ]}
          >
            {VERSION}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      {backgroundColor: preferenceTheme.background.background},
    ]}>
      <View style={styles.header}>
        <Text
          style={theme.typography.title3.bold}
        >
          {t('settingTab')}
        </Text>
      </View>
      <ScrollView
        bounces={false}
        style={{flex: 1}}
      >
        <LanguageModal
          trigger={() => {
            return (
              renderTrigger({
                icon: 'globe', 
                title: 'language', 
                description: 'chooseYourLanguage'
              })
            )
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ExportSeedPhrase')}
        >
          {
            renderTrigger({
              icon: 'shield', 
              title: 'security', 
              description: 'exportSeedPhrase'
            })
          }
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdatePassword')}
        >
          {
            renderTrigger({
              icon: 'lock', 
              title: 'password', 
              description: 'changeYourPassword'
            })
          }
        </TouchableOpacity>
        <View style={styles.settingItem}>
          <Icon name={'transfer'} width={20} height={20}/>
          <View style={styles.settingItemTextContainer}>
            <Text style={theme.typography.body.medium}>
              {t('appearance')}
            </Text>
            <Text
              style={[
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.secondary}
              ]}
            >
              {t('appearanceDescription')}
            </Text>
          </View>
          <View>
            <DarkModeToggle />
          </View>
        </View>
      </ScrollView>
      <Separator/>
      {renderFooter()}
    </View>
  )
}

export default SettingScreen;
