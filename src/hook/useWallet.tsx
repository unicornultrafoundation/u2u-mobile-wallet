import React, { useEffect, useMemo, useState } from "react";
import { useWalletStore } from "../state/wallet";
import { getWalletFromMnemonic } from "../util/wallet";

export function useWallet() {
  const { accessWallet, wallet, seedPhrase } = useWalletStore()
  return {wallet, accessWallet}
}