import {View} from 'react-native';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
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
      <Icon name="arrow-right" />
    </View>
  );
};

export default Header;
