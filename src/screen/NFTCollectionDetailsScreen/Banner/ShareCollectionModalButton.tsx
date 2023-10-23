import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import { styles } from '../styles';
import Icon from '../../../component/Icon';
import Modal from '../../../component/Modal';
import Text from '../../../component/Text';
import GradientText from '../../../component/Text/Gradient';


const ShareCollectionModalButton = () => {
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
            <View style={[styles.banner, { marginBottom: 48 }]}>
              <Image
                source={{ uri: 'https://fakeimg.pl/780x240/ff0000,128/000,255' }}
                style={[styles.bannerImage, { borderRadius: 8 }]}
              />

              <View
                style={[
                  styles.bannerAvatarWrapper,
                  styles.modalAvatarWrapper,
                  { borderColor: preferenceTheme.background.surface },
                ]}>
                <Image
                  source={{ uri: 'https://fakeimg.pl/100/' }}
                  style={styles.bannerImage}
                />
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  letterSpacing: 0.38,
                  marginBottom: 8,
                }}>
                MECH Cyper - U2 Game
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '500',
                  letterSpacing: -0.41,
                }}>
                Check out this stunning NFT
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
                    fontSize: 17,
                    fontWeight: '500',
                    letterSpacing: -0.41,
                    alignSelf: 'flex-start',
                  }}>
                  Collectibles on
                </Text>
                <GradientText
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    letterSpacing: -0.41,
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

export default ShareCollectionModalButton;
