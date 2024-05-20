import { useQuery } from "@tanstack/react-query";
import { useNetwork } from "./useNetwork";
import { useCallback } from "react";
import { Wallet } from "ethers";
import { useWallet } from "./useWallet";
import { logErrorForMonitoring } from "./useCrashlytics";

export interface DAppMetadata {
  name: string;
  logo?: string;
  description?: string;
  url?: string;
  chainId?: number;
}

export enum SessionStatus {
  STATUS_PENDING = "pending",
  STATUS_REJECTED = "rejected",
  STATUS_ACCEPTED = "accepted",
  STATUS_EXPIRED = "expired",
  STATUS_CLOSED = "closed"
}

export interface Session {
  id: string;
  signerAddress: string;
  dAppMetadata: DAppMetadata;
  status: SessionStatus;
  expiredAt: string;
  createdAt: string;
  updatedAt: string
}

export const useSessionDetail = (sessionID: string) => {
  const {networkConfig} = useNetwork()
  const {wallet} = useWallet()

  const {data, isLoading, error, isError} = useQuery<Session>({
    queryKey: ['session-detail', sessionID, networkConfig],
    queryFn: async () => {
      if (!networkConfig || !sessionID || sessionID === '') return {} as Session
      const url = `${networkConfig.api_endpoint}/sessions/${sessionID}`
      const rs = await fetch(url)
      const rsJSON = await rs.json()
      return rsJSON
    },
    initialData: {} as Session
  })

  const approveSession = useCallback(async () => {
    if (!sessionID || !wallet || !networkConfig) return
    const approveMessage = `approve-session-${sessionID}`
    const signer = new Wallet(wallet.privateKey)
    const signature = await signer.signMessage(approveMessage);

    const endpoint = `${networkConfig.api_endpoint}/sessions/approve`

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      signerAddress: wallet.address,
      signature,
      sessionID
    });
    
    const requestOptions: Record<string, any> = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const rs = await fetch(endpoint, requestOptions)
      const rsJSON = await rs.json()
      if (rsJSON.statusCode === 400) {
        throw new Error(rsJSON.message)
      }
      return rsJSON
    } catch (error) {
      logErrorForMonitoring(error as any, 'approveSession error')
      throw error
    }

  }, [sessionID, wallet, networkConfig])

  return {
    data,
    isLoading,
    isError,
    error,
    approveSession
  }
}