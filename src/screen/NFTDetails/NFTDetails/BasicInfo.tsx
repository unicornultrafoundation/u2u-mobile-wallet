import Text from '../../../component/Text';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { color, darkTheme, lightTheme } from '../../../theme/color';
import Icon from "../../../component/Icon";

const NFTBasicInfo = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  return (
    <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          letterSpacing: 0.07,
          marginBottom: 8,
        }}>
        Basic information
      </Text>

      <View style={[styles.row, { rowGap: 8, flexWrap: 'wrap' }]}>
        <View style={{ width: '50%' }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 0.07,
              color: preferenceTheme.text.primary,
            }}>
            Contract address
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 12 }}>0xa1234...9217021</Text>
            <TouchableOpacity>
              <Icon name='copy' width={16} height={16} color={color.neutral[500]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: '50%' }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 0.07,
              color: preferenceTheme.text.primary,
            }}>
            Token ID
          </Text>
          <Text style={{ fontSize: 12 }}>2361</Text>
        </View>

        <View style={{ width: '50%' }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 0.07,
              color: preferenceTheme.text.primary,
            }}>
            Blockchain
          </Text>
          <Text style={{ fontSize: 12 }}>U2U Solaris Mainnet</Text>
        </View>

        <View style={{ width: '50%' }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 0.07,
              color: preferenceTheme.text.primary,
            }}>
            Token standard
          </Text>
          <Text style={{ fontSize: 12 }}>ERC-721</Text>
        </View>

        <View style={{ width: '50%' }}>
          <Text
            style={{
              fontSize: 11,
              letterSpacing: 0.07,
              color: preferenceTheme.text.primary,
            }}>
            Time
          </Text>
          <Text style={{ fontSize: 12 }}>10/11/2023, 14:27:47</Text>
        </View>
      </View>
    </View>
  );
};

export default NFTBasicInfo;
