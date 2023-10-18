import { View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const NFTHistory = () => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const history = [
    {
      type: 'Receive',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Send',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Receive',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Send',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Receive',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Send',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Receive',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
    {
      type: 'Send',
      date: '2023-10-01',
      from: '0xad2313...ac124',
      to: '0xad2313...ac124',
    },
  ];

  return (
    <View style={{ gap: 12 }}>
      {history.map((item, index) => (
        <View style={styles.row} key={index}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Icon
              name={item.type === 'Receive' ? 'chevron-down-circle' : 'chevron-up-circle'}
              width={20}
              height={20}
              color={item.type === 'Receive' ? '#0FA44D' : '#D21C1C'}
            />

            <View>
              <Text style={{ fontSize: 12, fontWeight: '500', lineHeight: 13 }}>
                {item.type}
              </Text>
              <Text style={{ fontSize: 11, letterSpacing: 0.07 }}>
                {item.date}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: 0.07,
                  lineHeight: 13,
                  color: preferenceTheme.text.primary,
                }}>
                From
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: 0.07,
                  lineHeight: 13,
                  fontWeight: '500',
                }}>
                {item.from}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: 0.07,
                  color: preferenceTheme.text.primary,
                }}>
                To
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: 0.07,
                  lineHeight: 13,
                  fontWeight: '500',
                }}>
                {item.to}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default NFTHistory;
