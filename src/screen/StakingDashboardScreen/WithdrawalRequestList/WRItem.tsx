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

const WRItem = ({item}: {
  item: WithdrawalRequest
}) => {
  const {resetTxState} = useTransaction()
  const {darkMode} = usePreferenceStore()
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
        text1: 'Withdraw success',
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
        text1: 'Withdraw fail',
        text2: (error as Error).message,
        onHide: resetTxState,
      })
    }
  }

  return (
    <View
      style={[
        styles.wrItem,
        {
          borderColor: preferenceTheme.outline
        }
      ]}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            WrID
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {item.wrId}
          </Text>
        </View>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Unbonding
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {formatNumberString(item.unbondingAmount.dividedBy(10 ** 18).toFixed())} U2U
          </Text>
        </View>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Withdrawable
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {formatNumberString(item.withdrawalAmount.dividedBy(10 ** 18).toFixed())} U2U
          </Text>
        </View>
        <View>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            Validator ID
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {item.validatorId}
          </Text>
        </View>
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