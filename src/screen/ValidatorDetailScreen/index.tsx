import React, { useCallback, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import Icon from '../../component/Icon';
import { SvgUri } from 'react-native-svg';
import { Validator } from '../../service/staking';
import theme from '../../theme';
import { formatNumberString, shortenAddress } from '../../util/string';
import Tab from '../../component/Tab';
import InfoTab from './InfoTab';
import DelegatorTab from './DelegatorTab';
import RewardTab from './RewardTab';
import Button from '../../component/Button';
import { useTranslation } from 'react-i18next';
import { useTransactionStore } from '../../state/transaction';

const ValidatorDetailScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const {setRouteName} = useGlobalStore()
  const {t} = useTranslation<string>()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const validator: Validator = route.params?.validator || {}

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {resetTxState} = useTransactionStore();
  const [tab, setTab] = useState('info');
  const tabs = [
    { label: t('info'), value: 'info' },
    { label: t('delegator'), value: 'delegator' },
    { label: t('latestReward'), value: 'reward' },
  ];

  const handleChangeTab = (t: string) => {
    setTab(t);
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={[
            theme.typography.footnote.medium,
            {
              color: preferenceTheme.text.title,
              flexShrink: 1,
            }
          ]}
        >
          {validator.name}
        </Text>
        <View
          style={{
            marginLeft: 6,
            paddingVertical: 2,
            paddingHorizontal: 4,
            backgroundColor: validator.online ? theme.accentColor.tertiary.normal : theme.accentColor.error.normal,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={theme.typography.caption1.medium}>{validator.online ? t('active') : t('inactive')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <TouchableOpacity style={{paddingVertical: 16}} onPress={navigation.goBack}>
        <Icon name="arrow-left" width={24} height={24} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
        <View style={{width: 42, height: 42, paddingRight: 8}}>
          <SvgUri
            uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
            width="100%"
            height="100%"
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', gap: 2}}>
          {renderHeader()}
          <Text style={[theme.typography.caption1.regular]}>
            {shortenAddress(validator.auth, 10, 10)}
          </Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text
            style={[
              theme.typography.footnote.medium,
              {
                color: preferenceTheme.text.title,
                textAlign: 'right'
              }
            ]}
          >
            APR
          </Text>
          <Text
            style={[
              theme.typography.footnote.medium,
              {
                color: preferenceTheme.text.title,
              }
            ]}
          >
            {formatNumberString(validator.apr.toString(), 2)}%
          </Text>
        </View>
      </View>
      <Tab
        tabs={tabs}
        selectedTab={tab}
        onChange={handleChangeTab}
        tabStyle={{
          // borderColor: 'transparent',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingLeft: 0,
          paddingRight: 24,
        }}
        containerStyle={{
          // borderColor: 'transparent',
          marginTop: 20,
        }}
      />
      <View style={{flex: 1}}>
        {tab === 'info' && <InfoTab validator={validator} />}
        {tab === 'delegator' && <DelegatorTab validator={validator} />}
        {tab === 'reward' && <RewardTab validator={validator} />}
      </View>
      <View style={{
        backgroundColor: preferenceTheme.background.background,
        paddingTop: 24
      }}>
        <Button
          color='primary'
          style={{
            borderRadius: 60
          }}
          onPress={() => {
            resetTxState()
            navigation.navigate('Delegate', {validator})
          }}
        >
          {t('delegate')}
        </Button>
      </View>
    </View>
  )
};

export default ValidatorDetailScreen;