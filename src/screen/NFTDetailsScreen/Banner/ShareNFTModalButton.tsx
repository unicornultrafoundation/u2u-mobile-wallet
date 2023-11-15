import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { usePreferenceStore } from '../../../state/preferences';
import { color, darkTheme, lightTheme } from '../../../theme/color';
import Icon from '../../../component/Icon';
import Modal from '../../../component/Modal';
import Text from '../../../component/Text';
import GradientText from '../../../component/Text/Gradient';
import { styles } from '../styles';
import U2ULogo from '../../../asset/icon/u2u_wallet_icon.png';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { parseIPFSFile } from '../../../util/string';


const ShareNFTModalButton = ({item, metadata, nftCollection}: {
  nftCollection: NFTCollectionMeta,
  item: OwnedNFT,
  metadata: Record<string, any>
}) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="share" width={24} height={24}/>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            width: Dimensions.get('window').width * 0.9,
            backgroundColor: preferenceTheme.background.surface,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <View style={{ padding: 16 }}>
            <View style={{ alignItems: 'flex-start' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  letterSpacing: 0.38,
                  textAlign: 'justify'
                }}>
                Check out this stunning NFT!
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    letterSpacing: 0.38,
                    textAlign: 'justify'
                  }}>
                  It's on
                </Text>
                <GradientText
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    letterSpacing: 0.38
                  }}
                  gradient={{
                    colors: ['#3C9', '#714CF9'],
                    start: { x: 0.2, y: 0.25 },
                    end: { x: 0.15, y: 1.0 },
                    angle: 60,
                  }}>
                  U2U Wallet
                </GradientText>
              </View>
            </View>

            <Image
              source={{ uri: parseIPFSFile(metadata.image) }}
              style={{
                width: '100%',
                height: 'auto',
                minHeight: 280,
                objectFit: 'cover',
                borderRadius: 16,
                marginVertical: 16,
              }}
            />

            <Text style={{ color: preferenceTheme.text.primary, fontSize: 12, fontWeight: '500' }}>
              {nftCollection.name}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '700' }}>
              {nftCollection.name} #{item.id}
            </Text>

            <View style={{ width: '100%', height: 1, backgroundColor: color.neutral[600], marginVertical: 8 }}/>

            {/* <View style={styles.row}>
              <View>
                <Text
                  style={{ fontSize: 11, fontWeight: '500', letterSpacing: 0.07, color: preferenceTheme.text.primary }}>
                  Best price
                </Text>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Image source={U2ULogo} style={{ width: 12, height: 12 }} />
                  <Text style={{ fontSize: 12, fontWeight: '500' }}>
                    10.969 U2U
                  </Text>
                </View>
              </View>

              <View>
                <Text
                  style={{ fontSize: 11, fontWeight: '500', letterSpacing: 0.07, color: preferenceTheme.text.primary }}>
                  Share time
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '500' }}>
                  10/11/2023, 17:50:47
                </Text>
              </View>
            </View> */}
          </View>

          <LinearGradient
            colors={['#3C9', '#714CF9']}
            locations={[0, 0.8]}
            start={{ x: 0.6, y: 0.25 }}
            end={{ x: 0.55, y: 1.0 }}
            angle={60}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 16,
              height: 100,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ width: '35%' }}>
                <Text style={{ fontSize: 8, lineHeight: 10, marginBottom: 4 }}>
                  The most trusted cryptocurrency platform
                </Text>
                <Text
                  style={{ fontSize: 12, fontWeight: '700', marginBottom: 4 }}>
                  U2U Wallet
                </Text>

                <Icon name='u2u-brand' width={101} height={22}/>
              </View>

              <QRCode
                value={'test'}
                quietZone={16}
                size={64}
              />
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default ShareNFTModalButton;
