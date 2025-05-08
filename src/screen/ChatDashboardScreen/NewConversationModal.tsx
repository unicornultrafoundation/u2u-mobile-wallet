// import { TouchableOpacity, View, Image } from "react-native";
// import U2ULogo from '../../asset/icon/u2u_wallet_icon.png';
// import Modal from "../../component/Modal"
// import Text from "../../component/Text"
// import { usePreference } from "../../hook/usePreference";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import TextInput from "../../component/TextInput";
// import Separator from "../../component/Separator";
// import theme from "../../theme";
// import { isAddress } from "ethers";
// import { useCreateDMConversation } from "../../hook/chat/useCreateDMConversation";

// export default function NewConversationModal({ onRequestClose, visible }: {
//   visible: boolean;
//   onRequestClose: () => void;
// }) {
//   const {t} = useTranslation()
//   const {preferenceTheme} = usePreference()
//   const [walletAddress, setWaleltAddress] = useState('')
//   // 0xf16591A821aA99d87473a4306AaDf6c55C3324A0
//   const [errWalletAddress, setErrWalletAddress] = useState('')

//   const {createConversation} = useCreateDMConversation()

//   const handleCreate = async () => {
//     setErrWalletAddress('')
//     if (!isAddress(walletAddress)) {
//       setErrWalletAddress(t('invalidAddress'))
//       return
//     }

//     await createConversation(walletAddress)

//     onRequestClose()
//   }

//   return (
//     <Modal visible={visible} onRequestClose={onRequestClose}>
//       <View
//         style={{
//           width: 320,
//           padding: 24,
//           alignItems: 'center',
//           backgroundColor: preferenceTheme.background.background,
//           borderRadius: 16,
//           shadowColor: 'rgb(0, 0, 0)',
//           shadowOffset: {
//             width: 0,
//             height: 5,
//           },
//           shadowOpacity: 0.34,
//           shadowRadius: 6.27,
//           elevation: 10
//         }}
//       >
//         <Image source={U2ULogo} style={{ width: 40, height: 40 }}/>
//         <Text
//           type="title2-bold"
//           color="title"
//           style={{marginBottom: 36, marginTop: 16}}
//         >
//           {t('startNewConversation')}
//         </Text>
//         <View style={{width: '100%', alignItems: 'flex-start', gap: 6}}>
//           <Text
//             type="label2-medium"
//             color="secondary"
//           >
//             {t('walletAddress')}
//           </Text>
//           <TextInput
//             value={walletAddress}
//             onChangeText={setWaleltAddress}
//             placeholder={t('walletAddress')}
//             containerStyle={{width: '100%'}}
//             error={errWalletAddress}
//           />
//         </View>
//         <Separator style={{ width: '100%' }}/>
//         <TouchableOpacity
//           onPress={handleCreate}
//           style={{ width: '100%', alignItems: 'center' }}
//         >
//           <Text type="label-medium" style={{ color: theme.color.primary[500] }}>
//             {t('confirm')}
//           </Text>
//         </TouchableOpacity>

//         <Separator style={{ width: '100%' }}/>
//         <TouchableOpacity
//           style={{ width: '100%', alignItems: 'center' }}
//           onPress={onRequestClose}>
//           <Text type="label-medium" color="disabled">
//             {t('cancel')}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   )
// }