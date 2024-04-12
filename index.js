/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import BigNumber from 'bignumber.js'
import "fast-text-encoding";
import "./shim"
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

BigNumber.config({ FORMAT: {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: ''
} })

LogBox.ignoreLogs([
  'NOTE: web3.js is running without provider. You need to pass a provider in order to interact with the network!',
  'Non-serializable values were found in the navigation state',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use',
  'Warning: Cannot update a component (`AuthScreen`) while rendering a different component (`ForwardRef`)'
])

global.fetch = fetchPolyfill

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
