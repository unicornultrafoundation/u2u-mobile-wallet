// import { usePreference } from "@/hook/usePreference";
// import { TouchableOpacity, View } from "react-native";
// import { SvgUri } from "react-native-svg";
// import Text from '@/component/Text'
// import theme from "@/theme";
// import { formatNumberString, getDigit, parseNumberFormatter } from "@/util/string";
// import { useTokenBalance } from "@/hook/useTokenBalance";
// import { useWallet } from "@/hook/useWallet";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Icon from "@/component/Icon";
// import { TextInput } from "react-native";
// import BigNumber from "bignumber.js";
// import { encodeTxData } from "@/util/contract";
// import { ERC20_ABI } from "@/util/abis/erc20";
// import { logErrorForMonitoring } from "@/hook/useCrashlytics";
// import ConfirmStep from "./ConfirmStep";
// import AuthStep from "./AuthStep";
// import { useLocalStore } from "@/state/local";
// import { useTransaction } from "@/hook/useTransaction";
// import { useConversationDetail } from "@/hook/chat/useConversationDetail";

// export default function TxInput({conversationID, onComplete}: {
//   conversationID: string;
//   onComplete: () => void;
// }) {
//   const {t} = useTranslation()
//   const { preferenceTheme } = usePreference()
//   const {wallet} = useWallet()
//   const { addRecentAddress } = useLocalStore()

//   const {data: conversation} = useConversationDetail(conversationID)

//   const {setAmount, tokenMeta, amount, receiveAddress, setTxData, submitTx, resetTxState} = useTransaction()
//   const {balance} = useTokenBalance(wallet.address, tokenMeta.address)
//   const [internalAmount, setInternalAmount] = useState(amount)
//   const [error, setError] = useState('')
//   const [selection, setSelection] = useState<any>(undefined)
//   const [step, setStep] = useState('amount')

//   const handleSendTx = async () => {
//     setError('')
//     const amountDigit = getDigit(internalAmount)
//     const rawAmountBN = BigNumber(amountDigit)

//     if (rawAmountBN.toNumber() === 0) {
//       setError('invalidAmount')
//       return
//     }

//     if (rawAmountBN.gt(balance)) {
//       setError('insufficientBalance')
//       return
//     }

//     setAmount(amountDigit)
//     const isNativeTx = tokenMeta.address.toLowerCase() === "0x" || tokenMeta.address.toLowerCase() === ""
//     if (!isNativeTx) {
//       try {
//         const data = await encodeTxData(
//           {contractAddress: tokenMeta.address, abi: ERC20_ABI},
//           "transfer",
//           [
//             receiveAddress.toLowerCase(),
//             getDigit(
//               BigNumber(amountDigit).multipliedBy(10 ** tokenMeta.decimals).toFormat()
//             )
//           ]
//         )
//         setTxData(data)
//       } catch (error) {
//         logErrorForMonitoring(error as any, "encodeTxData error")
//       }
//     }
//     setStep('confirm')
//   }

//   if (step === 'confirm') {
//     return <ConfirmStep onNextStep={() => setStep('auth')} />
//   }

//   if (step === 'auth') {
//     return (
//       <AuthStep
//         onBack={() => setStep('confirm')}
//         onNextStep={async () => {
//           try {
//             if (!conversation) return
//             addRecentAddress(receiveAddress)
//             const txHash = await submitTx()
//             if (!txHash) {
//               console.log('send error')
//               return
//             }
//             console.log('sented', txHash)

//             await conversation.sendMessage({
//               text: `TX_SENTED:${txHash?.hash}_${wallet.address}_${amount}_${tokenMeta.symbol}_${tokenMeta.address.toLowerCase()}`,
//               attachments: [],
//               // quoted_message_id: '',
//             });
//             resetTxState()
//             onComplete()
//           } catch (error) {
//             logErrorForMonitoring(error as any, "send token error")
//           }
//         }}
//       />
//     )
//   }

//   return (
//     <View
//       style={{
//         paddingVertical: 8,
//         backgroundColor: preferenceTheme.background.background
//       }}
//     >
//       <View style={{
//         padding: 16,
//         alignItems: 'center', 
//         flexDirection: 'row', 
//         justifyContent: 'center',
//       }}>
//         <View style={{flexWrap: 'nowrap', flexShrink: 1}}>
//           <TextInput
//             selection={selection}
//             autoFocus
//             onChangeText={(val) =>{
//               const newVal = parseNumberFormatter(val.replaceAll(",", "."))
//               if (newVal != null) {
//                 setInternalAmount(newVal)
//               }
//             }}
//             value={internalAmount}
//             keyboardType="numeric"
//             style={[
//               theme.typography.largeTitle.medium,
//               {
//                 marginRight: 12,
//                 color: preferenceTheme.text.title
//               }
//             ]}
//           />
//         </View>
//         <Text style={theme.typography.largeTitle.medium}>{tokenMeta.symbol}</Text>
//       </View>
//       {error && (
//         <View style={{flexDirection: 'row', paddingBottom: 8, justifyContent: 'center', alignItems: 'center'}}>
//           <Icon name='error' width={18} height={18} />
//           <Text style={[
//             theme.typography.caption2.regular,
//             {
//               color: theme.accentColor.error.normal,
//               paddingLeft: 4
//             }
//           ]}>
//             {t(error)}
//           </Text>
//         </View>
//       )}
//       <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, paddingHorizontal: 16, gap: 4}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             // marginBottom: 14,
//             padding: 8,
//             borderRadius: 8,
//             backgroundColor: preferenceTheme.background.surface,
//             alignItems: 'center',
//             flex: 1
//           }}
//         >
//           <View style={{width: 28, height: 28}}>
//             <SvgUri
//               uri={tokenMeta.logo}
//               width="100%"
//               height="100%"
//             />
//           </View>
//           <View style={{flex: 1, paddingHorizontal: 11}}>
//             <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.primary}]}>{t('balance')}</Text>
//             <Text style={theme.typography.footnote.regular}>{formatNumberString(balance)} {tokenMeta.symbol}</Text>
//           </View>
//           <TouchableOpacity
//             style={{
//               paddingVertical: 12,
//               paddingHorizontal: 16,
//               borderRadius: 8,
//               borderWidth: 1,
//               borderColor: preferenceTheme.outline
//             }}
//             onPress={() => {
//               setInternalAmount(balance)
//               setSelection({start: 0, end: 0})
//               setTimeout(() => {
//                 setSelection(undefined)
//               }, 300)
//             }}
//           >
//             <Text
//               style={[
//                 theme.typography.caption1.medium,
//                 {
//                   color: theme.color.neutral[500]
//                 }
//               ]}
//             >
//               {t('max')}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity onPress={handleSendTx}>
//           <Icon
//             name="send-chat"
//             width={24}
//             height={24}
//             color={theme.color.primary[500]}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }