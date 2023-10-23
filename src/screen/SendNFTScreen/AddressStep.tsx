import { TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import React, { useCallback } from 'react';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import TextInput from '../../component/TextInput';
import Button from '../../component/Button';
import { StepProps } from './index';

const NFTTransferAddressStep = ({ onNextStep, onBack }: StepProps) => {
  const route = useRoute();
  const styles = useStyles()
  const { setRouteName } = useGlobalStore();

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <View style={[styles.row, { marginBottom: 24 }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-left" width={24} height={24}/>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '700',
            letterSpacing: 0.38,
            textAlign: 'center',
          }}>
          Transfer
        </Text>

        <View style={{ flex: 1 }}/>
      </View>

      <View>
        <Text
          style={{
            fontSize: 11,
            letterSpacing: 0.07,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          Items transferred to the wrong address cannot be recovered
        </Text>
        {/* Todo: Fix input style */}
        <TextInput containerStyle={{ height: 48, marginVertical: 24 }}/>
      </View>

      <View style={{ flex: 1 }}/>

      <Button type="fill" fullWidth onPress={onNextStep}>
        Continue
      </Button>
    </View>
  );
};

export default NFTTransferAddressStep;
