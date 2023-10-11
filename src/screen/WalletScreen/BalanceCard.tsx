import React, {useEffect} from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import {styles} from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import {usePreferenceStore} from '../../state/preferences';
import {darkTheme, lightTheme} from '../../theme/color';
import {useNavigation} from '@react-navigation/native';
import {useTransactionStore} from '../../state/transaction';
import {useFadeAnimation} from './useFadeAnimation';

const BalanceCard = ({collapsed}: {collapsed: boolean}) => {
  const {fadeIn, fadeOut, heightStyle, opacityStyle} = useFadeAnimation();

  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const navigation = useNavigation<any>();
  const {setTokenMeta} = useTransactionStore();

  useEffect(() => {
    collapsed ? fadeOut() : fadeIn();
  }, [collapsed]);

  return (
    <View style={styles.balanceCardContainer}>
      <TouchableOpacity style={styles.balanceCardVisibleButton}>
        <Text style={styles.balanceText}>Total balance</Text>
        <Icon name="eye" width={16} height={16} />
      </TouchableOpacity>

      <Text style={styles.balanceNumberInFiatText}>$0</Text>

      <Animated.Text
        style={[
          styles.balanceNumberInU2U,
          {
            color: preferenceTheme.text.secondary,
            // height: heightStyle(20),
            opacity: opacityStyle,
          },
        ]}>
        0 U2U
      </Animated.Text>

      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: heightStyle(80),
          opacity: opacityStyle,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 32,
          }}>
          <TouchableOpacity
            style={styles.balanceActionButton}
            onPress={() => {
              setTokenMeta({
                name: 'Ultra Unicorn',
                symbol: 'U2U',
                decimals: 18,
                address: '0x',
                logo: 'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg',
              });
              navigation.navigate('SendToken');
            }}>
            <Icon name="arrow-up" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>Send</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 32,
          }}>
          <TouchableOpacity
            style={styles.balanceActionButton}
            onPress={() => {
              navigation.navigate('ReceiveToken', {
                tokenMeta: {
                  name: 'Ultra Unicorn',
                  symbol: 'U2U',
                  decimals: 18,
                  address: '0x',
                  logo: 'https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg',
                },
              });
            }}>
            <Icon name="arrow-down" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>Receive</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={[styles.balanceActionButton, {marginRight: 0}]}>
            <Icon name="paper" width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.balanceActionButtonText}>History</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default BalanceCard;
