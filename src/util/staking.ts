import BigNumber from "bignumber.js"
import { Delegation, Delegator, Validation, Validator, ValidatorEpochInfo } from "../service/staking"
import { LockedStake } from "../hook/useFetchLockedStake"
import { WithdrawalRequest } from "../hook/useFetchWithdrawRequest"

export const delegationDataProcessor = (data: any): Delegation => {
  if (!data) return {} as Delegation
  return {
    id: data.id,
    validatorId: data.validatorId,
    delegator: data.delegator.id,
    delegatorAddress: data.delegator.address,
    stakedAmount: BigNumber(data.stakedAmount),
    totalClaimedRewards: BigNumber(data.totalClaimedRewards)
  }
}

export const validationDataProcessor = (data: any, totalStaked: BigNumber, apr: number = 0): Validation => {  
  if (!data) return {} as Validation
  return {
    id: data.id,
    stakedAmount: BigNumber(data.stakedAmount),
    validator: validatorDataProcessor(data.validator, totalStaked, apr)
  }
}

export const delegatorDataProcessor = (data: any, totalStaked: BigNumber): Delegator => {  
  if (!data) return {} as Delegator
  return {
    id: data.id,
    address: data.address,
    stakedAmount: BigNumber(data.stakedAmount),
    createdOn: Number(data.createdOn),
    validations: data.validations && data.validations.length > 0 ? data.validations.map((i: any) => validationDataProcessor(i, totalStaked)) : [],
    totalClaimedRewards: BigNumber(data.totalClaimedRewards)
  }
}

export const validatorDataProcessor = (data: any, totalStaked: BigNumber, apr: number): Validator => {  
  if (!data) return {} as Validator
  return {
    valId: data.validatorId,
    name: `Validator ${data.validatorId}`,
    auth: data.auth || "",
    createdEpoch: data.createdEpoch || "",
    createdTime: data.createdTime || "",
    active: Number(data.active) === 0,
    online: Number(data.online) === 0,
    delegatedAmount: BigNumber(data.delegatedAmount || 0),
    selfStakedAmount: BigNumber(data.selfStaked || 0),
    totalStakedAmount: BigNumber(data.totalStakedAmount || 0),
    totalClaimedRewards: BigNumber(data.totalClaimedRewards || 0),
    downTime: data.downTime,
    lockedUntil: data.lockedUntil,
    lockDays: data.lockDays,
    votingPower: totalStaked ? Number(BigNumber(data.totalStakedAmount).multipliedBy(1000000).div(totalStaked)) : 0,
    delegations: data.delegations && data.delegations.length > 0 ? data.delegations.map((d: any) => delegationDataProcessor(d)) : [],
    totalDelegator: Number(data.totalDelegator),
    apr: apr
  }
}

export const epochOfvalidator  = (data: any): ValidatorEpochInfo => {
  if (!data) return {} as ValidatorEpochInfo
  return {
    epochId: Number(data.epoch.id),
    validatorId: Number(data.validatorId),
    epochRewards: BigNumber(data.epochRewards),
    endTime: Number(data.epoch.endTime) * 1000
  }
}

export const lockedStakeDataProcessor = (data: any): LockedStake => {  
  if (!data) return {} as LockedStake
  return {
    delegator: data.delegator.id,
    validatorId: data.validator.id,
    duration: Number(data.duration) * 1000,
    endTime: Number(data.endTime) * 1000,
    lockedAmount: BigNumber(data.lockedAmount),
    penalty: data.penalty ? BigNumber(data.penalty) : BigNumber(0),
    isLockedUp: !!data.delegator.id 
  }
}

export const withdrawalRequestDataProcessor = (data: any, withdrawPeriodTime: number): WithdrawalRequest => {
  if (!data) return {} as WithdrawalRequest
  const _now = Math.floor(Date.now() / 1000)
  return {
    wrId: data.wrID,
    delegatorAddress: data.delegatorAddress,
    validatorId: data.validatorId,
    unbondTime: Number(data.time) * 1000,
    unbondingAmount: BigNumber(data.unbondingAmount),
    withdrawalAbleTime: (Number(data.time) * 1000 + withdrawPeriodTime * 1000),
    withdrawable: _now -  Number(data.time) > withdrawPeriodTime ? true : false,
    withdrawalAmount: BigNumber(data.withdrawalAmount),
    undelegateHash: data.hash,
    withdrawalHash: data.withdrawHash,
    withdrawalTime: Number(data.withdrawTime) * 1000,
    withdrawal: !BigNumber(data.withdrawalAmount).isZero()
  }
}