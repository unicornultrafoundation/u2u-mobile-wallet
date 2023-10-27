import BigNumber from "bignumber.js"
import { Delegation, Validator, ValidatorEpochInfo } from "../service/staking"

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