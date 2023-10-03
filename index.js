/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import BigNumber from 'bignumber.js'
import "./shim"

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

global.fetch = fetchPolyfill
AppRegistry.registerComponent(appName, () => App);
