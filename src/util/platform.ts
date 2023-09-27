import ReactNative, { Appearance, Dimensions, NativeModules, Platform, ScaledSize } from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { UIManager } = NativeModules;

interface DimensionProps {
  window: ScaledSize;
  screen: ScaledSize;
}

export interface ViewPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isTablet = DeviceInfo.isTablet();
export const isDarkMode = Appearance.getColorScheme() === 'dark';

const iPhoneXPaddingBottom = 34;
const iPhoneStatusBarHeight = 20;
const iPhoneXStatusBarHeight = 32;

export function isIphoneX() {
  if (isIOS) {
    const dimen = Dimensions.get('window');
    return (dimen.height === 780 || dimen.width === 780)
      || (dimen.height === 812 || dimen.width === 812)
      || (dimen.height === 844 || dimen.width === 844)
      || (dimen.height === 896 || dimen.width === 896)
      || (dimen.height === 926 || dimen.width === 926);
  }
  return false;
}

export function getIPhoneStatusBarHeight(): number {
  return isIphoneX() ? iPhoneXStatusBarHeight : iPhoneStatusBarHeight;
}

export function getPhonePaddingBottom(): number {
  return isIphoneX() ? iPhoneXPaddingBottom : 0;
}

export function getPhonePaddingTop(): number {
  return isAndroid ? 0 : getIPhoneStatusBarHeight();
}



export function isPortrait(screenData: ScaledSize) {
  return screenData.width <= screenData.height;
}

export function isLandscape(screenData: ScaledSize) {
  return screenData.width > screenData.height;
}

export function getViewPosition(ref: any, callback: (position: ViewPosition) => void) {
  if (!ref) {
    return;
  }
  const handle = ReactNative.findNodeHandle(ref);
  if (handle) {
    UIManager.measure(handle, (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
      callback({ x, y, width, height, pageX, pageY });
    });
  } else {
    console.log('Can not find element!');
  }
}

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

