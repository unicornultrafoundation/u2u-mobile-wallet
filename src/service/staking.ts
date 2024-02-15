import BigNumber from "bignumber.js";
import { ContractOptions, contractCall } from "../util/contract";
import { Schema } from "./graph/schema";
import { TABLE_LIMIT } from "../config/constant";
import { LockedStake } from "../hook/useFetchLockedStake";
import request from "graphql-request";

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
  avatar: string
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

export const queryValidators = (endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().VALIDATORS
  )
}

export const queryStakingStats = (endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().STAKING_STATS
  )
}

export const queryValidatorsApr = (vals: number[], endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().VALIDATORS_APR(vals)
  )
}

export const queryEpochOfValidator = (valId: number, valIdHex: string, skip: number, endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().EPOCH_OF_VALIDATOR,
    {
      validatorId: valId,
      validatorIdHexString: valIdHex,
      skip: skip*TABLE_LIMIT,
      limit: TABLE_LIMIT
    }
  )
}

export const queryDelegatorDetail = (address: string, endpoint: string) => {
  return request<{delegators: any[]}>(
    endpoint,
    Schema().DELEGATOR_DETAIL, 
    {
      delegatorAddress: address.toLowerCase()
    }
  )
}

export const queryLockedStake = (delegator: string, valIdHex: string, endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().LOCKED_STAKE, 
    {
      delegatorAddress: delegator,
      valId: valIdHex
    }
  )
}

export const queryAllLockedStake = (delegator: string, endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().ALL_LOCKED_STAKE, 
    {
      delegatorAddress: delegator,
    }
  )
}

export const queryAllWithdrawalRequest = (delegator: string, endpoint: string) => {
  return request<any>(
    endpoint,
    Schema().ALLWITHDRAWALREQUEST, 
    {
      delegatorAddress: delegator,
    }
  )
}

export const fetchValidatorInfo = async (validatorAuth: string) => {
  try {
    if (!validatorAuth) return undefined
    const url = `https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/validators_info/${validatorAuth.toLowerCase()}/info.json`
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    // logErrorForMonitoring(error as any, "fetchValidatorInfo error")
    return undefined
  }
}


