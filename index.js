/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import BigNumber from 'bignumber.js'
import "fast-text-encoding";
import "./shim"
// import 'react-native-get-random-values'

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
AppRegistry.registerComponent(appName, () => App);
