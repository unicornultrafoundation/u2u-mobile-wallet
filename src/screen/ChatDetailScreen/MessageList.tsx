// import { FlatList, Linking, TouchableOpacity, View } from "react-native"
// import Text from '@/component/Text'
// import { styles } from "./styles"
// import { isToday } from "date-fns"
// import { formatDate } from "@/util/date"
// import { useWallet } from "@/hook/useWallet"
// import { usePreference } from "@/hook/usePreference"
// import { useEffect, useMemo, useState } from "react"
// import { getUniqueByField } from "@/util/array"
// import { useSubscribeMessage } from "@/hook/chat/useSubscribeMessage"
// import { useRoute } from "@react-navigation/native"
// import { useConversationMessages } from "@/hook/useConversationMessages"
// import theme from "@/theme"
// import { useConversationDetail } from "@/hook/chat/useConversationDetail"
// import { useSupportedTokens } from "@/hook/useSupportedTokens"
// import { CachedImage } from "@georstat/react-native-image-cache"
// import { SvgUri } from "react-native-svg"
// import Icon from "@/component/Icon"
// import { formatNumberString } from "@/util/string"
// import { useNetwork } from "@/hook/useNetwork"
// import { useTranslation } from "react-i18next"

// export default function MessageList() {
//   const {t} = useTranslation()
//   const {wallet} = useWallet()
//   const {blockExplorer} = useNetwork()
//   const {supportedTokens} = useSupportedTokens()
//   const { preferenceTheme } = usePreference()

//   const route = useRoute<any>();
//   const conversationID: string = route.params?.conversationID || ''

//   const {data} = useConversationDetail(conversationID)

//   const [allMessagesHistory, setAllMessageHistory] = useState<Record<string, any>[]>([])
//   const [lastMessageID, setLastMessageID] = useState('')

//   const {data: messages, isFetching} = useConversationMessages(conversationID, lastMessageID)
//   const {messages: latestMessages} = useSubscribeMessage(conversationID)

//   const allMessages = useMemo(() => {
//     const value = getUniqueByField([...allMessagesHistory, ...latestMessages], 'id')
//       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
//     return value
//   }, [allMessagesHistory, latestMessages])

//   const handleLoadMore = () => {
//     if (isFetching || !allMessages || allMessages.length === 0) return;
//     if (allMessages[allMessages.length - 1].id.toLowerCase() !== lastMessageID) {
//       setLastMessageID(allMessages[allMessages.length - 1].id)
//     }
//   }

//   useEffect(() => {
//     setAllMessageHistory([...messages, ...allMessagesHistory])
//     data?.markRead()
//   }, [messages])

//   const renderTokenLogo = (uri: string) => {
//     if (uri.endsWith(".png")) {
//       return (
//         <CachedImage
//           source={uri}
//           style={{ width: 28, height: 28 }}
//           thumbnailSource="https://via.placeholder.com/28x28"
//         />
//       )
//     } else {
//       return (
//         <SvgUri
//           uri={uri}
//           width="100%"
//           height="100%"
//         />
//       )
//     }
//   }

//   const parseMessageContent = (content: string) => {
//     const [type, data] = content.split(":")
//     switch (type) {
//       case 'TX_SENTED':
//         const [hash, from, amount, symbol, contractAddress] = data.split('_')

//         const tokenItem = supportedTokens.find((i: any) => {
//           return i.address.toLowerCase() === contractAddress.toLowerCase()
//         })

//         return (
//           <View>
//             <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
//               <Text>
//                 {t('transactionSuccess')}
//               </Text>
//             </View>
//             <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
//               <View style={{width: 32, height: 32}}>
//                 {tokenItem ? (
//                   renderTokenLogo(tokenItem.logo)
//                 ) : (
//                   <Icon
//                     name='anonymous-token'
//                   />
//                 )}
//               </View>
//               <Text>-</Text>
//               <Text type="title3-bold">
//                 {formatNumberString(amount)} {symbol}
//               </Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 Linking.openURL(`${blockExplorer}/tx/${hash.toLowerCase()}`)
//               }}
//             >
//               <Text>View Detail</Text>
//             </TouchableOpacity>
//           </View>
//         )
//       default:
//         return (
//           <Text
//             selectable
//           >
//             {content}
//           </Text>
//         )
//     }
//   }

//   return (
//     <FlatList
//       contentContainerStyle={{flexGrow: 1}}
//       data={allMessages}
//       inverted
//       renderItem={({item, index}) => {
//         const fromMe = item.from === wallet.address.toLowerCase()
//         return (
//           <View style={[styles.messageRow, {alignItems: fromMe ? 'flex-end' : 'flex-start'}]} key={`messages=${index}`}>
//             <Text
//               type="caption2-medium"
//               color="secondary"
//             >
//               {isToday(item.createdAt) ? formatDate(item.createdAt, 'HH:mm') : formatDate(item.createdAt, 'dd/MM HH:mm')}
//             </Text>
//             <View style={[styles.messageContainer, {backgroundColor: fromMe ? theme.color.primary[600] : preferenceTheme.background.surface}]}>
//               {parseMessageContent(item.content)}
//             </View>
//           </View>
//         )
//       }}
//       onEndReached={handleLoadMore}
//       onEndReachedThreshold={.3}
//     />
//   )
// }