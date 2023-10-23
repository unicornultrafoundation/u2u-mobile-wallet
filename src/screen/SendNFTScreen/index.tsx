import { SafeAreaView } from 'react-native';
import { useStyles } from './styles';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useGlobalStore } from '../../state/global';
import { useCallback, useState } from 'react';
import NFTTransferAddressStep from './AddressStep';
import NFTTransferConfirmStep from './ConfirmStep';
import NFTTransferSubmittingStep from './SubmittingStep';
import NFTTransferResult from './TxResultStep';

export interface StepProps {
  onNextStep?: () => void;
  onBack?: () => void;
}

const SendNFTScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);

  const route = useRoute();
  const { setRouteName } = useGlobalStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NFTTransferAddressStep
            onNextStep={() => setStep(2)}
            onBack={navigation.goBack}
          />
        );
      case 2:
        return (
          <NFTTransferConfirmStep
            onNextStep={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <NFTTransferSubmittingStep
            onNextStep={() => setStep(4)}
            onBack={navigation.goBack}
          />
        );
      case 4:
        return <NFTTransferResult onBack={navigation.goBack}/>;
      default:
        return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  return <SafeAreaView style={styles.container}>{renderStep()}</SafeAreaView>;
};

export default SendNFTScreen;
