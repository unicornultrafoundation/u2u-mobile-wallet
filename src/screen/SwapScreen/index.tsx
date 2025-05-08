import Icon from "@/component/Icon";
import Text from "@/component/Text";
import { usePreference } from "@/hook/usePreference";
import { useWallet } from "@/hook/useWallet";
import { useGlobalStore } from "@/state/global";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { typography } from "@/theme/typography";
import TokenSelector from "./TokenSelector";
import { useTokenBalance } from "@/hook/useTokenBalance";
import SlideButton from 'rn-slide-button';
import theme from "@/theme";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function SwapScreen() {
  const {wallet} = useWallet()
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

  const [inputToken, setInputToken] = useState<Record<string, any>>({})
  const [outputToken, setOutputToken] = useState<Record<string, any>>({})
  const [mode, setMode] = useState<'exactIn' | 'exactOut'>('exactIn')
  const [inputAmount, setInputAmount] = useState('0')
  const [outputAmount, setOutputAmount] = useState('0')

  const inputTokenModalRef = useRef<BottomSheetModal>(null);
  const outputTokenModalRef = useRef<BottomSheetModal>(null);

  const {balance: inputBalance} = useTokenBalance(wallet.address, inputToken.address, inputToken.decimals)
  const {balance: outputBalance} = useTokenBalance(wallet.address, outputToken.address, outputToken.decimals)

  const handleSwitch = () => {
    setInputAmount('0')
    setOutputAmount('0')

    const temp = {...inputToken}
    setInputToken(outputToken)
    setOutputToken(temp)
  }

  const handleSwap = () => {
    console.log('handleSwap')
  }

  return (
    <SafeAreaView
      style={{backgroundColor: preferenceTheme.background.background, flex: 1}}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {color: preferenceTheme.text.title}]}>{t('swap')}</Text>
        </View>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="paper" width={24} height={24} color={preferenceTheme.text.title} />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.swapContainer, { backgroundColor: preferenceTheme.background.surface }]}
      >
        {/* INPUT SECTION */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text
              style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}
            >
              {t('from')}
            </Text>
            <Text
              style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}
            >
              {t('balance')}:{' '}
              <Text
                style={[typography.footnote.medium, {color: preferenceTheme.text.secondary}]}
              >
                {inputBalance}
              </Text>
            </Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextInput
              value={inputAmount}
              style={[
                typography.largeTitle.medium,
                {color: preferenceTheme.text.title}
              ]}
            />
            <TokenSelector modalRef={inputTokenModalRef} token={inputToken} onSelect={setInputToken} />
          </View>
        </View>
        {/* DIVIDER */}
        <View style={{flexDirection: 'row', gap: 16, alignItems: 'center', marginVertical: 14}}>
          <View style={{flex: 1, height: 1, backgroundColor: preferenceTheme.outline}} />
          <TouchableOpacity
            style={styles.balanceActionButton}
            onPress={handleSwitch}>
            <Icon name="swap" width={24} height={24} color={preferenceTheme.divider} />
          </TouchableOpacity>
          <View style={{flex: 1, height: 1, backgroundColor: preferenceTheme.outline}} />
        </View>
        {/* OUTPUT SECTION */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text
              style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}
            >
              {t('to')}
            </Text>
            <Text
              style={[typography.caption1.medium, {color: preferenceTheme.text.secondary}]}
            >
              {t('balance')}:{' '}
              <Text
                style={[typography.footnote.medium, {color: preferenceTheme.text.secondary}]}
              >
                {outputBalance}
              </Text>
            </Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextInput
              value={outputAmount}
              style={[
                typography.largeTitle.medium,
                {color: preferenceTheme.text.title}
              ]}
            />
            <TokenSelector modalRef={outputTokenModalRef} token={outputToken} onSelect={setOutputToken} />
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1, justifyContent: 'flex-end'}}>
        <SlideButton
          title={t('slideToSwap')}
          padding={4}
          icon={<Icon name="chevron-right" color={preferenceTheme.text.primary} width={24} height={24} />}
          thumbStyle={{
            backgroundColor: theme.color.primary[500]
          }}
          titleContainerStyle={{
            backgroundColor: theme.color.primary[800]
          }}
          containerStyle={{
            backgroundColor: theme.color.primary[800]
          }}
          underlayStyle={{
            backgroundColor: theme.color.primary[500]
          }}
          onReachedToEnd={handleSwap}
        />
      </View>
    </SafeAreaView>
  )
}