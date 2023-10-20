import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import Separator from '../../component/Separator';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { StepProps } from './index';
import { accentColor, color } from '../../theme/color';
import Button from '../../component/Button';
import React from 'react';
import TX_DETAIL from '../../asset/images/tx_detail.png';

const NFTTransferResult = ({ onBack }: StepProps) => {
  const success = true;
  const styles = useStyles();

  return (
    <ScrollView>
      <View style={[styles.row, { padding: 16 }]}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          {success ? (
            <Icon name="success" width={24} height={24}/>
          ) : (
            <Icon name="error" width={24} height={24}/>
          )}
          <Text fontSize={20} fontWeight="700" letterSpacing={0.38}>
            {success ? 'Transfer Success' : 'Transfer failed'}
          </Text>
        </View>

        <TouchableOpacity onPress={onBack}>
          <Icon name="close" width={24} height={24}/>
        </TouchableOpacity>
      </View>

      <Separator style={{ marginVertical: 16 }}/>

      <View style={[styles.row, { paddingHorizontal: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            style={{ borderRadius: 4 }}
            source={{ uri: 'https://fakeimg.pl/300/ff0000,128/000,255' }}
            width={34}
            height={34}
          />

          <View>
            <Text
              color="primary"
              fontSize={11}
              fontWeight="500"
              style={{ lineHeight: 16 }}>
              MECH Cyper - U2 Game
            </Text>
            <Text fontSize={12} fontWeight="700">
              WARRIOR #1269
            </Text>
          </View>
        </View>

        <Button
          style={{
            borderRadius: 6,
            height: 12,
            paddingVertical: 2,
            paddingHorizontal: 4,
          }}
          textStyle={{
            color: accentColor.error.darker,
            fontSize: 7,
            letterSpacing: -0.205,
            lineHeight: 8,
          }}
          type="fill"
          color="error">
          Send
        </Button>
      </View>

      <Separator style={{ marginVertical: 16 }}/>

      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <View>
          <Text fontSize={11} color="primary" style={{ marginBottom: 4 }}>
            From
          </Text>
          <View style={styles.row}>
            <Text fontSize={11}>
              0x09335570E84602d4c7354E7Ed5e377a4FEeC1D8D
            </Text>
            <TouchableOpacity>
              <Icon
                name="copy"
                color={color.neutral[500]}
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text fontSize={11} color="primary" style={{ marginBottom: 4 }}>
            To
          </Text>
          <View style={styles.row}>
            <Text fontSize={11}>
              0x09335570E84602d4c7354E7Ed5e377a4FEeC1D8D
            </Text>
            <TouchableOpacity>
              <Icon
                name="copy"
                color={color.neutral[500]}
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Separator style={{ marginVertical: 16 }}/>

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.row}>
          <View style={{ flex: 3 }}>
            <Text color="primary" fontSize={11}>
              Time
            </Text>
            <Text>10/04/2023, 10:06:06</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text color="primary" fontSize={11}>
              Type
            </Text>
            <Text>Send</Text>
          </View>
        </View>

        <Separator style={{ marginVertical: 12 }}/>

        <View style={styles.row}>
          <View style={{ flex: 3 }}>
            <Text color="primary" fontSize={11}>
              Network fee
            </Text>
            <Text>0.000568 U2U ($1.0054)</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text color="primary" fontSize={11}>
              Network
            </Text>
            <Text>U2U Mainnet</Text>
          </View>
        </View>

        <Separator style={{ marginVertical: 12 }}/>

        <View style={styles.row}>
          <View style={{ flex: 3 }}>
            <Text color="primary" fontSize={11}>
              Transaction hash
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text>0xa1234...9217021</Text>

              <TouchableOpacity>
                <Icon
                  name="copy"
                  color={color.neutral[500]}
                  width={16}
                  height={16}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <Text color="primary" fontSize={11}>
              Block
            </Text>
            <Text>6969696</Text>
          </View>
        </View>

        <Separator style={{ marginVertical: 12 }}/>

        <TouchableOpacity>
          <View style={styles.row}>
            <Text fontSize={16} fontWeight="500">
              View on blockchain explorer
            </Text>
            <Icon name="chevron-right" width={16} height={16}/>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginVertical: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={TX_DETAIL}
          resizeMode="contain"
          width={223}
          height={235}
          style={{
            width: 223,
            height: 235,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default NFTTransferResult;
