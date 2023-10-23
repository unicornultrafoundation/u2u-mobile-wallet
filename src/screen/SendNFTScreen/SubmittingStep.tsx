import { Image, View } from 'react-native';
import { StepProps } from './index';
import Text from '../../component/Text';
import SEND_ILLUS from '../../asset/images/send_tx.png';
import React, { useEffect, useState } from 'react';
import Button from '../../component/Button';

const NFTTransferSubmittingStep = ({ onNextStep, onBack }: StepProps) => {
  const [skipping, setSkipping] = useState(false);

  const handleSkipResult = () => {
    setSkipping(true);
    onBack && onBack();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (skipping) {
        clearTimeout(timeout);
        return;
      }
      onNextStep && onNextStep();
    }, 5000);
  }, [onNextStep, skipping]);

  return (
    <View style={{ padding: 16, flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text
          fontSize={20}
          fontWeight="700"
          letterSpacing={0.38}
          textAlign="center"
          style={{ marginBottom: 32 }}>
          Transfer submitted
        </Text>
        <Text
          fontSize={11}
          fontWeight="500"
          letterSpacing={0.07}
          textAlign="center"
          style={{ lineHeight: 13 }}>
          Please wait a moment or skip to
        </Text>
        <Text
          fontSize={11}
          fontWeight="500"
          letterSpacing={0.07}
          textAlign="center"
          style={{ lineHeight: 13 }}>
          check transaction status
        </Text>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={SEND_ILLUS}
            style={{
              width: 182,
              height: 292,
              marginTop: 80,
            }}
          />
        </View>
      </View>

      <Button type="fill" fullWidth onPress={handleSkipResult}>
        Skip
      </Button>
    </View>
  );
};

export default NFTTransferSubmittingStep;
