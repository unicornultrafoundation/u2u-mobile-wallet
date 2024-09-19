// Drawer.js
import React, { useEffect } from 'react';
import { TouchableOpacity, Animated, Dimensions, StyleSheet, View, Image } from 'react-native';
import { useGlobalStore } from '../../state/global';
import { usePreference } from '../../hook/usePreference';
import Text from '../../component/Text'
import Icon from '../Icon';
import { getPhonePaddingTop } from '../../util/platform';
import LOGO from '../../asset/images/logo_text_full.png'
import { useTranslation } from 'react-i18next';
import { typography } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { useLocalStore } from '../../state/local';

const { width, height } = Dimensions.get('window');

const Drawer = () => {
  const navigation = useNavigation<any>()
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()
  const {drawerOpened, setDrawerOpened} = useGlobalStore()
  const translateX = new Animated.Value(width);

  const {enableU2UConnect} = useLocalStore()

  useEffect(() => {
    if (drawerOpened) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerOpened])

  const closeDrawer = () => {
    setDrawerOpened(false)
  };

  if (!drawerOpened) return null

  return (
    <>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
            backgroundColor: preferenceTheme.background.background
          }
        ]}
      >
        <View style={{paddingHorizontal: 16, paddingVertical: 48}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
            <Image
              source={LOGO}
              width={135}
              height={28}
            />
            <TouchableOpacity onPress={closeDrawer}>
              <Icon name='close' width={28} height={28} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 8, paddingVertical: 17}}
            onPress={() => {
              closeDrawer()
              navigation.navigate('Notification')
            }}
          >
            <Icon name="notification" width={24} height={24} />
            <Text style={[typography.body.medium, {color: preferenceTheme.text.title}]}>
              {t('notification')}
            </Text>
          </TouchableOpacity>
          {enableU2UConnect && (
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 8, paddingVertical: 17}}
              onPress={() => {
                closeDrawer()
                navigation.navigate('ConnectedSession')
              }}
            >
              <Icon name="connect" width={24} height={24} color='#D8D8D8' />
              <Text style={[typography.body.medium, {color: preferenceTheme.text.title}]}>
                {t('connectedSession')}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 8, paddingVertical: 17}}
            onPress={() => {
              closeDrawer()
              navigation.navigate('WCConnectedSession')
            }}
          >
            <Icon name="connect" width={24} height={24} color='#D8D8D8' />
            <Text style={[typography.body.medium, {color: preferenceTheme.text.title}]}>
              {t('wcConnectedSession')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 8, paddingVertical: 17}}
            onPress={() => {
              closeDrawer()
              navigation.navigate('ChatDashboard')
            }}
          >
            <Icon name="chat" width={24} height={24} color='#D8D8D8' />
            <Text style={[typography.body.medium, {color: preferenceTheme.text.title}]}>
              {t('chat')}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    width,
    height,
    zIndex: 10,
    flex: 1,
    marginTop: getPhonePaddingTop()
  },
});

export default Drawer;