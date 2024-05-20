import { useQuery } from "@tanstack/react-query"
import { useNetwork } from "./useNetwork"
import { useWallet } from "./useWallet"
import { Session } from "./useSessionDetail";
import { useCallback } from "react";
import { useTransaction } from "./useTransaction";
import BigNumber from "bignumber.js";
import { Wallet } from "ethers";

export enum SignRequestStatus {
  STATUS_PENDING = "pending",
  STATUS_REJECTED = "rejected",
  STATUS_SIGNED = "signed",
  STATUS_EXPIRED = "expired",
}

export enum SignRequestType {
  SIGN_TX = 'transaction',
  SIGN_MESSAGE = 'message'
}

export interface SignRequest {
  id: string;
  rawData: Record<string, any>;
  signedData: string;
  type: SignRequestType;
  txHash: string;
  signerAddress: string;
  session: Session

  status: SignRequestStatus;
  expiredAt: string;
  createdAt: string;
  updatedAt: string
}

export const useSignRequest = (requestID: string) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {estimatedGasPrice, estimateGasPrice, estimateGasLimit, submitRawTx, txHash} = useTransaction()

  const {data, isLoading} = useQuery<SignRequest>({
    queryKey: ['sign-request-detail', requestID, networkConfig],
    queryFn: async () => {
      if (!networkConfig || !requestID || requestID === '') return {} as SignRequest
      const url = `${networkConfig.api_endpoint}/sign-request/${requestID}`
      console.log(url)
      const rs = await fetch(url)
      const rsJSON = await rs.json()
      return rsJSON
    },
    initialData: {} as SignRequest
  })

  const approveSignRequest = useCallback(async () => {
    if (!data || !data.rawData || !networkConfig) return
    if (data.type === SignRequestType.SIGN_MESSAGE) {

    } else {
      await estimateGasPrice()
      const rawTx: Record<string, any> = {
        receiveAddress: data.rawData.to,
        amount: BigNumber(data.rawData.value).dividedBy(10 ** 18).toFixed(),
        txData: data.rawData.data || "0x",
        gasPrice: data.rawData.gasPrice || estimatedGasPrice,
        gasLimit: data.rawData.gasLimit || await estimateGasLimit(data.rawData)
      }

      const rs = await submitRawTx(rawTx)
      console.log(rs)
      const txHash = rs?.hash

      if (!txHash) return

      const approveMessage = `approve-sign-request-${requestID}`
      const signer = new Wallet(wallet.privateKey)
      const signature = await signer.signMessage(approveMessage)

      const raw = JSON.stringify({
        requestID,
        txHash,
        signature
      })
      console.log(raw)
      const endpoint = `${networkConfig.api_endpoint}/sign-request/approve`

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions: Record<string, any> = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const approveRs = await fetch(endpoint, requestOptions)
      const rsJSON = await approveRs.json()
      if (rsJSON.statusCode === 400) {
        throw new Error(rsJSON.message)
      }
      return rsJSON
    }
  }, [data, wallet, networkConfig])

  return {
    data,
    isLoading,
    approveSignRequest,
    txHash
  }
}