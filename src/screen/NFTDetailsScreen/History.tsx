import { View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';

const NFTHistory = () => {
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
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

  const renderAddress = (label: string, address: string) => {
    return (
      <Text style={[
        theme.typography.caption2.regular,
        {color: preferenceTheme.text.disabled, textAlign: 'right'}
      ]}>
        {t(label)}
        <Text style={{color: preferenceTheme.text.title, textAlign: 'right'}}> {address}</Text>
      </Text>
    )
  }

  return (
    <View>
      {history.map((item, index) =>  {
        const isReceive = item.type.toLowerCase() === 'receive'
        const color = isReceive ? theme.accentColor.tertiary.normal : theme.accentColor.error.normal
        return (
          <View 
            style={styles.txHistoryContainer} 
            key={index}
          >
            <Icon
              name={isReceive ? 'arrow-down-circle' : 'arrow-up-circle'}
              color={color}
              width={20}
              height={20}
            />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text style={[ 
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.primary}
              ]}>
                {item.type}
              </Text>
              <Text style={[
                theme.typography.caption2.regular,
                {color: preferenceTheme.text.disabled}
              ]}>
                {item.date}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', gap: 2}}>
              {renderAddress('from', item.from)}
              {renderAddress('to', item.to)}
            </View>
          </View>
        )
      })}
    </View>
  );
};

export default NFTHistory;
