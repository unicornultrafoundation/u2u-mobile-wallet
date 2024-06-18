import React, { useMemo, useState } from 'react'
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Text from '../../../component/Text';
import theme from '../../../theme';
import { formatNumberString, shortenAddress } from '../../../util/string';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Button from '../../../component/Button';
import { Validation } from '../../../service/staking';
import { usePendingReward } from '../../../hook/usePendingReward';
import { useWallet } from '../../../hook/useWallet';
import { useStaking } from '../../../hook/useStaking';
import { useTranslation } from 'react-i18next';
import { useClaimRewards } from '../../../hook/useClaimRewards';
import Toast from 'react-native-toast-message';
import { useTransaction } from '../../../hook/useTransaction';
import UnstakeSection from './UnstakeSection';
import { useFetchLockedStake } from '../../../hook/useFetchLockedStake';
import BigNumber from 'bignumber.js';
import LockModal from './LockModal';
import { usePreference } from '../../../hook/usePreference';
import { logErrorForMonitoring } from '../../../hook/useCrashlytics';

const DelegationItem = ({item}: {
  item: Validation
}) => {
  const {wallet} = useWallet()
  const {preferenceTheme} = usePreference()

  const {t} = useTranslation<string>()

  const {stakingContractOptions} = useStaking()
  const { pendingRewards } = usePendingReward({delegatorAddress: wallet.address, stakingContractOptions, validatorId: Number(item.validator.valId)})
  const { claimRewards } = useClaimRewards(stakingContractOptions)
  const {resetTxState} = useTransaction()
  const { lockedStake } = useFetchLockedStake(wallet.address, Number(item.validator.valId))
  const { lockedAmount, endTime, isLockedUp, penalty } = lockedStake

  const [claiming, setClaiming] = useState(false)
  const [showUnstake, setShowUnstake] = useState(false)

  const actualStakedAmount = useMemo(() => {
    if (item.stakedAmount && !item.stakedAmount.isZero()) {
      let _amount = item.stakedAmount.minus(BigNumber(lockedAmount || 0))
      if (penalty) {
        _amount = _amount.minus(penalty)
      }
      return _amount
    }
    return BigNumber(0)
  }, [item, lockedAmount, penalty])

  const handleClaim = async () => {
    try {
      setClaiming(true)
      const tx = await claimRewards({toValidatorID: Number(item.validator.valId)})
      console.log(tx)
      setClaiming(false) 

      if (!tx) {
        return
      }

      setShowUnstake(false)
      Toast.show({
        type: 'success',
        text1: 'Claim rewards success',
        onHide: resetTxState,
        props: {
          txHash: tx.hash,
          renderTrailing: () => {
            return (
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {formatNumberString(
                  pendingRewards, 6
                )} U2U
              </Text>
            )
          }
        }
      })
    } catch (error) {
      setClaiming(false)
      logErrorForMonitoring(error as any, "claim rewards error")
      Toast.show({
        type: 'error',
        text1: 'Claim rewards fail',
        text2: (error as Error).message,
        onHide: resetTxState,
        props: {
          renderTrailing: () => {
            return (
              <Text
                style={[
                  theme.typography.body.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {formatNumberString(
                  pendingRewards, 6
                )} U2U
              </Text>
            )
          }
        }
      })
    }
  }

  const handleUnstake = async () => {
    setShowUnstake(true)
  }

  return (
    <View
      style={[
        styles.delegationItem,
        {
          borderColor: preferenceTheme.outline,
          gap: 6,
        }
      ]}
      key={`delegation-${item.id}`}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 4}}>
        <View style={{width: 34, height: 34, marginRight: 8}}>
          <SvgUri
            uri={"https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/public_assets/token_logos/u2u.svg"}
            width="100%"
            height="100%"
          />
        </View>
        <View
          style={{flex: 1, justifyContent: 'space-between'}}
        >
          <Text
            style={[
              theme.typography.caption1.medium,
              {
                color: preferenceTheme.text.title
              }
            ]}
          >
            {item.validator.name}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              theme.typography.caption1.regular,
              {
                color: preferenceTheme.text.primary
              }
            ]}
          >
            {shortenAddress(item.validator.auth, 6, 6)}{' - '}
            {t('votingPower')}: {item.validator.votingPower ? formatNumberString((item.validator.votingPower / 10000).toString(), 3) : 0}% 
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LockModal
            item={item}
            trigger={() => {
              return (
                <View style={{
                  backgroundColor: preferenceTheme.background.surface,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 30,
                }}>
                  <Text style={theme.typography.footnote.bold}>
                    {t('lock')}
                  </Text>
                </View>
              )
            }}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12, gap: 6}}>
        <View style={{flex: 1, gap: 2}}>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            {t('stakedAmount')}
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {formatNumberString(
              actualStakedAmount.dividedBy(10 ** 18).toFixed()
            )} U2U
          </Text>
        </View>
        <View style={{flex: 1, gap: 2}}>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            {t('claimable')}
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {formatNumberString(
              pendingRewards, 6
            )} U2U
          </Text>
        </View>
        <View style={{gap: 2}}>
          <Text
            style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary}]}
          >
            APR
          </Text>
          <Text
            style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}
          >
            {formatNumberString(
              item.validator.apr.toString()
            )}%
          </Text>
        </View>
      </View>
      {showUnstake ? (
        <UnstakeSection
          item={item}
          onCancel={() => setShowUnstake(false)}
          actualStakedAmount={actualStakedAmount.dividedBy(10 ** 18)}
        />
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 10}}>
          <Button
            onPress={handleClaim}
            loading={claiming}
            disabled={claiming}
            color='primary'
            style={{
              borderRadius: 60,
              flex: 1,
              paddingVertical: 8
            }}
            textStyle={[
              theme.typography.label.medium,
              {
                color: preferenceTheme.text.title
              }
            ]}
          >
            {t('claimReward')}
          </Button>
          <Button
            onPress={handleUnstake}
            style={{
              borderRadius: 60,
              flex: 1,
              paddingVertical: 8,
              backgroundColor: preferenceTheme.background.surface
            }}
            textStyle={[
              theme.typography.label.medium,
              {
                color: preferenceTheme.text.disabled
              }
            ]}
          >
            {t('unstake')}
          </Button>
        </View>
      )}
    </View>
  )
}

export default DelegationItem;
