import { gql } from "@apollo/client"
import { gql as minimalGQL } from 'graphql-request'

const DELEGATIONS_GQL = `
  id
  validatorId
  delegator {
    id
    address
  }
  stakedAmount  
  totalClaimedRewards
`;
const VALIDATOR_GQL = `
  id
  validatorId
  hash
  auth
  selfStaked
  delegatedAmount
  totalStakedAmount
  createdTime
  createdEpoch
  active
  online
  downTime
  lockedUntil
  lockDays
  totalClaimedRewards
  delegations {${DELEGATIONS_GQL}}
  totalDelegator
`

const VALIDATIONS_GQL = `
  id
  validator {${VALIDATOR_GQL}}
  stakedAmount
`

const EPOCH_OF_VAL_GQL = `
  id
  receivedStake
  accumulatedRewardPerToken
  epoch {
    id
    block
    endTime
    totalTxReward
    epochFee
    epochRewards
    totalRewards
  }
  validatorId
  epochRewards
  totalRewards
`


export const Schema = () => {
  return {
    STAKING_STATS: gql`
      query StakingStats {
        stakings {
          id
          totalStaked
          totalDelegated
          totalSelfStaked
          totalValidator
          totalDelegator
        }
      }
    `,
    VALIDATORS: gql`
      query Validators {
        validators {${VALIDATOR_GQL}}
      }
    `,
    VALIDATOR_DETAIL: gql`
      query ValidatorDetail($valId: Int!) {
        validators(where:{
          validatorId: $valId
        }) 
          {${VALIDATOR_GQL}}
      }
    `,
    DELEGATOR_DETAIL: gql`
      query DelegatorDetail($delegatorAddress: String!) {
        delegators(where:{
        address: $delegatorAddress
        }) {
          id
          address
          stakedAmount
          createdOn
          totalClaimedRewards
          validations {${VALIDATIONS_GQL}}
        }
      }
    `,
    WITHDRAWALREQUEST: gql`
      query WithdrawalRequest($delegatorAddress: String!, $validatorId: Int!) {
        withdrawalRequests (where:{
          delegatorAddress: $delegatorAddress
          validatorId: $validatorId
        }
        orderBy: time
        orderDirection: desc
        ) { 
          id
          hash
          delegatorAddress
          validatorId
          delegatorAddress
          validatorId
          wrID
          time
          unbondingAmount
          withdrawHash
          hash
          withdrawalAmount
          withdrawTime
        }
      }
    `,
    ALLWITHDRAWALREQUEST: gql`
      query WithdrawalRequest($delegatorAddress: String!) {
        withdrawalRequests (where:{
          delegatorAddress: $delegatorAddress
        }
        orderBy: time
        orderDirection: desc
        ) { 
          id
          hash
          delegatorAddress
          validatorId
          delegatorAddress
          validatorId
          wrID
          time
          unbondingAmount
          withdrawHash
          hash
          withdrawalAmount
          withdrawTime
        }
      }
    `,
    LOCKED_STAKE: gql`
      query LockedUp($delegatorAddress: String!, $valId: String!) {
        lockedUps (where:{
            delegator: $delegatorAddress
            validator: $valId
          }) {
            delegator {
              id
            }
            validator {
              id
            }
            duration
            lockedAmount
            unlockedAmount
            penalty
            endTime
          }
      }
    `,
    ALL_LOCKED_STAKE: gql`
      query AllLockedUp($delegatorAddress: String!) {
        lockedUps (where:{
          delegator: $delegatorAddress
        }) {
          delegator {
            id
          }
          validator {
            id
          }
          duration
          lockedAmount
          unlockedAmount
          penalty
          endTime
        }
      }
    `,
    DELEGATIONS_PAGINATION: gql`
      query Delegations($validatorId: Int!, $skip: Int!, $limit: Int!) {
        delegations(where:{
            validatorId: $validatorId
        } orderBy: stakedAmount
          orderDirection: desc  
          first: $limit
          skip: $skip
        ) {${DELEGATIONS_GQL}}
      }
    `,
    STAKING_APR: gql`
      query stakingApr($validatorId: Int!, $stakingAmount: String!) {
        apr0: calculateApr(
          validatorId: $validatorId
          amount: $stakingAmount
          duration: 0
        )
      }
    `,
    VALIDATORS_APR(vals: any[]) {
      let queryString = `query stakingApr {`;
      queryString += vals.map(
        (val) => `
          apr${val}: calculateApr(
            validatorId: ${val}
            amount: "1000000000000000000000"
            duration: 0
          )
            `
      );
      queryString += "}";
      // @ts-ignore
      return gql(queryString);
    },
    EPOCH_OF_VALIDATOR: gql`
      query EpochOfValidator ($validatorId: Int!, $validatorIdHexString: String!, $skip: Int!, $limit: Int!) {
        validators(
        orderBy: epoch__block
        orderDirection: desc
        first: $limit
        skip: $skip
        where: {
          validatorId: $validatorId
        }
        ) {${EPOCH_OF_VAL_GQL}}
        validatorCounters (where:{
          id: $validatorIdHexString
        }) {
            total
            id
          }
      }
    `,
    LAST_EPOCH: gql`
      query LastEpoch {
        epoches (
        orderBy: epoch
        orderDirection: desc
        first: 1
        ) {
          epoch
          endTime
          epochRewards
          totalRewards
        }
      }
    `,
    OWNED_NFT: minimalGQL`
      query OwnedNFT($address: String!, $first: Int!, $skip: Int!) {
        items(
          where: {
            owner: $address
          },
          first: $first,
          skip: $skip
        ) {
          id
          tokenID
          tokenURI
          owner {
            id
          }
        }
      }
    `,
    NFT_HISTORY: minimalGQL`
      query NFTHistory($tokenID: String!) {
        transferHistories(
          where: {
            tokenID: $tokenID
          }
        ) {
          id
          txHash
          from {
            id
          }
          to {
            id
          }
          tokenID
          transferAt
        }
      }
    `,
    ALL_NFT: minimalGQL`
      query AllNFT($first: Int!, $skip: Int!) {
        items(
          first: $first,
          skip: $skip
        ) {
          id
          tokenID
          tokenURI
          owner {
            id
          }
        }
      }
    `
  }
}