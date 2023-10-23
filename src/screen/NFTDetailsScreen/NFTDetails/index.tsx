import { View } from 'react-native';
import NFTBasicInfo from './BasicInfo';
import NFTTraits from './Traits';

const NFTDetails = () => {
  return (
    <View style={{ gap: 24 }}>
      <NFTBasicInfo/>
      <NFTTraits/>
    </View>
  );
};

export default NFTDetails;
