import {Image, View} from 'react-native';
import Text from '../../component/Text';
import Arrow from '../../asset/icon/arrow-right.png';
const Header = ({text}: {text: string}) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}>
      <Text style={{fontSize: 16, fontWeight: 700}}>{text}</Text>
      <Image source={Arrow} />
    </View>
  );
};

export default Header;
