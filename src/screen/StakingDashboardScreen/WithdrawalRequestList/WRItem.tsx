import React, { useMemo, useState } from 'react'
import { View } from 'react-native';
import Text from '../../../component/Text';
import { styles } from './styles';
import theme from '../../../theme';
import { formatNumberString } from '../../../util/string';
import Button from '../../../component/Button';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { WithdrawalRequest } from '../../../hook/useFetchWithdrawRequest';
import { formatDate } from '../../../util/date';
import { WithdrawParams, useWithdraw } from '../../../hook/useWithdraw';
import { useStaking } from '../../../hook/useStaking';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import { useTranslation } from 'react-i18next';

const WRItem = ({item}: {
  item: WithdrawalRequest
}) => {
  const {resetTxState} = useTransaction()
  const {darkMode} = usePreferenceStore()
  const {t} = useTranslation()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {stakingContractOptions} = useStaking()
  const {withdraw} = useWithdraw(stakingContractOptions)

  const [claiming, setClaiming] = useState(false)

  const isClaimable = useMemo(() => {
    if (item.withdrawalAbleTime > Date.now()) return false
    return true
  }, [item])

  const handleClaim = async () => {
    if (!isClaimable) return
    const params: WithdrawParams = {
      toValidatorID: Number(item.validatorId),
      wrID: Number(item.wrId)
    }
    try {
      setClaiming(true)
      const tx = await withdraw(params)
      console.log(tx)
      setClaiming(false)

      if (!tx) {
        return
      }
      Toast.show({
        type: 'success',
        text1: t('msgWithdrawSuccess'),
        onHide: resetTxState,
        props: {
          txHash: tx.hash,
        }
      })
    } catch (error) {
      console.log("error: ", error);
      setClaiming(false)

      Toast.show({
        type: 'error',
        text1: t('msgWithdrawFail'),
        text2: (error as Error).message,
        onHide: resetTxState,
      })
    }
  }

  const renderItem = ({label, content} : {
    label: string,
    content: string,
  }) => {
    return (
      <View style={{flex: 1, gap: 2}}>
        <Text
          style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
        >
          {t(label)}
        </Text>
        <Text
          style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
        >
          {content}
        </Text>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.wrItem,
        {
          borderColor: preferenceTheme.outline,
          gap: 20,
        }
      ]}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 5}}>
        {renderItem({label: 'wrID', content: item.wrId})}
        {renderItem({label: 'unbonding', content: `${formatNumberString(item.unbondingAmount.dividedBy(10 ** 18).toFixed())} U2U`})}
        {renderItem({label: 'withdrawable', content: `${formatNumberString(item.withdrawalAmount.dividedBy(10 ** 18).toFixed())} U2U`})}
        {renderItem({label: 'validatorID', content: item.validatorId})}
      </View>
      <Button
        loading={claiming}
        disabled={!isClaimable}
        onPress={handleClaim}
        style={{
          borderRadius: 60,
          flex: 1,
          paddingVertical: 8,
          backgroundColor: isClaimable ? theme.color.primary[500] : preferenceTheme.background.surface
        }}
        textStyle={[
          theme.typography.label.medium,
          {
            color: preferenceTheme.text.title
          }
        ]}
      >
        {isClaimable ? "Withdraw" : `Available at ${formatDate(new Date(item.withdrawalAbleTime), "HH:mm dd/MM/yyyy")}`}
      </Button>
    </View>
  )
}

export default WRItem;