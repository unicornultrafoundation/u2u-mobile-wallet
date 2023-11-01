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
import { formatNumberString } from '../../util/string';
import Tab from '../../component/Tab';
import InfoTab from './InfoTab';
import DelegatorTab from './DelegatorTab';
import RewardTab from './RewardTab';
import Button from '../../component/Button';

const ValidatorDetailScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const {setRouteName} = useGlobalStore()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name)
    }, [route])
  )

  const validator: Validator = route.params?.validator || {}

  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const [tab, setTab] = useState('info');
  const tabs = [
    { label: 'Info', value: 'info' },
    { label: 'Delegator', value: 'delegator' },
    { label: 'Latest Reward', value: 'reward' },
  ];

  const handleChangeTab = (t: string) => {
    setTab(t);
  };

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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 42, height: 42, paddingRight: 8}}>
          <SvgUri
            uri="https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"
            width="100%"
            height="100%"
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              theme.typography.footnote.medium,
              {
                color: preferenceTheme.text.title,
              }
            ]}
          >
            {validator.name}
          </Text>
          <View
            style={{
              paddingVertical: 0,
              paddingHorizontal: 4,
              backgroundColor: validator.online ? theme.accentColor.tertiary.normal : theme.accentColor.error.normal,
              borderRadius: 18,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text>
              {validator.online ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>
        <View>
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
            navigation.navigate('Delegate', {validator})
          }}
        >
          Delegate
        </Button>
      </View>
    </View>
  )
};

export default ValidatorDetailScreen;