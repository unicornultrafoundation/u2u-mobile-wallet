import React, {useEffect} from 'react';
import {Animated, Easing, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Icon from '../../component/Icon';
import {useWallet} from '../../hook/useWallet';
import Text from '../../component/Text';
import {truncate} from '../../util/string';

const WalletHeader = ({collapsed}: {collapsed: boolean}) => {
  const {wallet} = useWallet();
  const animatedValue = new Animated.Value(1);

  const fadeOut = () => {
    animatedValue.setValue(1);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };
  const fadeIn = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  };

  useEffect(() => {
    collapsed ? fadeOut() : fadeIn();
  }, [collapsed]);

  return (
    <Animated.View
      style={[
        styles.headerSection,
        {
          height: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
            extrapolate: 'clamp',
          }),
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      {/*<View style={styles.headerSection}>*/}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="u2u" width={28} height={28} />
        <View style={{marginLeft: 8}}>
          <Text style={styles.addressText}>{truncate(wallet.address, 14)}</Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Text style={styles.networkText}>Testnet</Text>
            <Icon name="chevron-down" width={10} height={10} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Icon name="copy" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 12}}>
          <Icon name="notification" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="scan" width={24} height={24} />
        </TouchableOpacity>
      </View>
      {/*</View>*/}
    </Animated.View>
  );
};

export default WalletHeader;
