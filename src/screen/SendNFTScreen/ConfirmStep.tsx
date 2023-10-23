import { Image, TouchableOpacity, View } from 'react-native';
import { StepProps } from './index';
import { useStyles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import React from 'react';
import Separator from '../../component/Separator';
import U2UIcon from '../../asset/icon/u2u_wallet_icon.png';
import Button from '../../component/Button';

const NFTTransferConfirmStep = ({ onNextStep, onBack }: StepProps) => {
  const styles = useStyles();

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <View style={[styles.row, { marginBottom: 24 }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
        </View>

        <Text
          fontSize={20}
          letterSpacing={0.38}
          fontWeight="700"
          style={{
            flex: 1,
            textAlign: 'center',
          }}>
          Transfer
        </Text>

        <View style={{ flex: 1 }}/>
      </View>

      <View style={{ gap: 16, flex: 1 }}>
        <View style={[styles.card, { gap: 8 }]}>
          <Image
            source={{ uri: 'https://fakeimg.pl/300/ff0000,128/000,255' }}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              minHeight: 330,
              borderRadius: 6,
            }}
          />

          <View>
            <Text color="primary" fontSize={12} fontWeight="500">
              MECH Cyper - U2 Game
            </Text>
            <Text fontSize={14} fontWeight="700">
              WARRIOR #6969
            </Text>
          </View>

          <Separator style={{ marginVertical: 8 }}/>

          <View>
            <Text color="primary" fontSize={11} letterSpacing={0.07}>
              To
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Icon name="wallet-icon" width={24} height={24}/>
              <Text fontSize={12}>
                0x09335570E84602d4c7354E7Ed5e377a4FEeC1D8D
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text fontSize={14} letterSpacing={-0.08} color="primary">
                EST. fee
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                0.000568 U2U
              </Text>
              <Text fontSize={11} letterSpacing={0.07} color="primary">
                ≈ $10.014.4
              </Text>
            </View>
          </View>

          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              Max fee
            </Text>

            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                0.000568 U2U
              </Text>
              <Icon
                name="chevron-right"
                width={16}
                height={16}
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              Wallet
            </Text>

            <View style={{ alignItems: 'flex-end' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                Address 1 - Peppa Pig
              </Text>
              <Text fontSize={11} letterSpacing={0.07} color="primary">
                0xa132...441
              </Text>
            </View>
          </View>

          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Text fontSize={14} letterSpacing={-0.08} color="primary">
              Network
            </Text>

            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text fontSize={14} letterSpacing={-0.08}>
                U2U Mainnet
              </Text>
              <Image source={U2UIcon} style={{ width: 16, height: 16 }}/>
            </View>
          </View>
        </View>
      </View>

      <Button type="fill" fullWidth onPress={onNextStep}>
        Confirm
      </Button>
    </View>
  );
};

export default NFTTransferConfirmStep;
