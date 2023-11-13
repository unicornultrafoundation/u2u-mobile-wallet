import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { styles } from './styles'
import theme from '../../theme';
import Icon from '../../component/Icon';
import Separator from '../../component/Separator';
import LegalModal from './LegalModal';
import LanguageModal from './LanguageModal';
import { useTranslation } from 'react-i18next';

const VERSION = DeviceInfo.getVersion()

const SettingScreen = () => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <View style={styles.header}>
        <Text
          style={theme.typography.title3.bold}
        >
          {t('settingTab')}
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1
        }}
      >
        <LanguageModal
          trigger={() => {
            return (
              <View style={styles.settingItem}>
                <Icon
                  name='globe'
                  width={20}
                  height={20}
                />
                <View style={styles.settingItemTextContainer}>
                  <Text
                    style={[
                      theme.typography.body.medium
                    ]}
                  >
                    {t('language')}
                  </Text>
                  <Text
                    style={[
                      theme.typography.caption1.medium
                    ]}
                  >
                    {t('chooseYourLanguage')}
                  </Text>
                </View>
                <Icon
                  name='chevron-right'
                  width={24}
                  height={24}
                />
              </View>
            )
          }}
        />
        <TouchableOpacity style={styles.settingItem}>
          <Icon
            name='lock'
            width={20}
            height={20}
          />
          <View style={styles.settingItemTextContainer}>
            <Text
              style={[
                theme.typography.body.medium
              ]}
            >
              {t('security')}
            </Text>
            <Text
              style={[
                theme.typography.caption1.medium
              ]}
            >
              Export seed phrase
            </Text>
          </View>
          <Icon
            name='chevron-right'
            width={24}
            height={24}
          />
        </TouchableOpacity>
      </ScrollView>
      <Separator />
      <LegalModal
        trigger={() => {
          return (
            <View style={styles.settingItem}>
              <View style={styles.settingItemTextContainer}>
                <Text
                  style={[
                    theme.typography.body.medium
                  ]}
                >
                  Legal
                </Text>
              </View>
              <Icon
                name='chevron-right'
                width={24}
                height={24}
              />
            </View>
          )
        }}
      />
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingItemTextContainer}>
          <Text
            style={[
              theme.typography.body.medium
            ]}
          >
            {t('version')}
          </Text>
        </View>
        <Text
          style={[
            theme.typography.body.medium
          ]}
        >
          {VERSION}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SettingScreen;
