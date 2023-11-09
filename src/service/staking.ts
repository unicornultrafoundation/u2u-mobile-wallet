import BigNumber from "bignumber.js";
import { ContractOptions, contractCall } from "../util/contract";
import { apolloClient, apolloStakingClient, apolloU2UNetworkClient } from "./graph/client";
import { Schema } from "./graph/schema";
import { TABLE_LIMIT } from "../config/constant";
import { LockedStake } from "../hook/useFetchLockedStake";

export interface Validation {
  id: string
  validator: Validator
  stakedAmount: BigNumber
}

export interface Delegator {
  id: string
  address: string
  stakedAmount: BigNumber
  createdOn: number
  validations?: Validation[]
  totalClaimedRewards: BigNumber
}

export interface Delegation {
  id: string
  validatorId: string
  delegatorAddress: string
  delegator: Delegator
  stakedAmount: BigNumber
  totalClaimedRewards: BigNumber
} 

export interface Validator {
  valId: string
  name: string
  auth: string
  createdEpoch: string
  createdTime: string
  active?: boolean
  online?: boolean
  delegatedAmount: BigNumber
  selfStakedAmount: BigNumber
  totalStakedAmount: BigNumber
  totalClaimedRewards: BigNumber
  downTime?: string
  lockedUntil?: string
  lockDays?: string
  delegations?: Delegation[]
  votingPower?: number
  totalDelegator: number
  apr: number
  authLockInfo?: LockedStake,
}

export interface ValidatorEpochInfo {
  epochId: number
  validatorId: number
  epochRewards: BigNumber
  endTime: number
}

export interface Delegator {
  id: string
  address: string
  stakedAmount: BigNumber
  createdOn: number
  validations?: Validation[]
  totalClaimedRewards: BigNumber
}

export const fetchCurrentEpoch = (options: ContractOptions, rpc: string) => {
  return contractCall(options, rpc, "currentEpoch", [])
}

export const fetchCurrentEpochSnapShot = (options: ContractOptions, epoch: number, rpc: string) => {
  return contractCall(options, rpc, "getEpochSnapshot", epoch)
}

export const fetchEpochAccumulatedRewardPerToken = (options: ContractOptions, epoch: number, validatorID: number, rpc: string) => {
  return contractCall(options, rpc, "getEpochAccumulatedRewardPerToken", [epoch, validatorID])
}

export const fetchTotalSupply = (options: ContractOptions, rpc: string) => {
  return contractCall(options, rpc, "totalSupply", [])
}

export const fetchPendingRewards = (options: ContractOptions, delegatorAddress: string, validatorID: number, rpc: string) => {
  return contractCall(options, rpc, "pendingRewards", [delegatorAddress, validatorID])
}

export const queryValidators = () => apolloClient.query({
  query: Schema().VALIDATORS,
  fetchPolicy: "no-cache"
})

export const queryStakingStats = () => apolloClient.query({
  query: Schema().STAKING_STATS,
  fetchPolicy: "no-cache"
})

export const queryValidatorsApr = (vals: number[]) => apolloStakingClient.query({
  query: Schema().VALIDATORS_APR(vals),
  fetchPolicy: "no-cache"
})

export const queryEpochOfValidator = (valId: number, valIdHex: string, skip: number) => apolloU2UNetworkClient.query({
  query: Schema().EPOCH_OF_VALIDATOR,
  variables: {
    validatorId: valId,
    validatorIdHexString: valIdHex,
    skip: skip*TABLE_LIMIT,
    limit: TABLE_LIMIT
  },
  fetchPolicy: "no-cache"
})

export const queryDelegatorDetail = (address: string) => apolloClient.query({
  query: Schema().DELEGATOR_DETAIL,
  variables: {
    delegatorAddress: address
  },
  fetchPolicy: "no-cache"
})

export const queryLockedStake = (delegator: string, valIdHex: string) => apolloClient.query({
  query: Schema().LOCKED_STAKE,
  variables: {
    delegatorAddress: delegator,
    valId: valIdHex
  },
  fetchPolicy: "no-cache"
})

export const queryAllLockedStake = (delegator: string) => apolloClient.query({
  query: Schema().ALL_LOCKED_STAKE,
  variables: {
    delegatorAddress: delegator,
  },
  fetchPolicy: "no-cache"
})

export const queryWithdrawalRequest = (delegator: string, validatorId: number) => apolloClient.query({
  query: Schema().WITHDRAWALREQUEST,
  variables: {
    delegatorAddress: delegator,
    validatorId: validatorId
  },
  fetchPolicy: "no-cache"
})

export const queryAllWithdrawalRequest = (delegator: string) => apolloClient.query({
  query: Schema().ALLWITHDRAWALREQUEST,
  variables: {
    delegatorAddress: delegator
  },
  fetchPolicy: "no-cache"
})