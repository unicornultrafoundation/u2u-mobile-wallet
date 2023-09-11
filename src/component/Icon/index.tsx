import React from 'react';
// import HomeInactive from '../../asset/icon/home.png'
import { DimensionValue, Image, ImageStyle } from 'react-native';

const HomeInactive = require('../../asset/icon/home.png')
const HomeActive = require('../../asset/icon/home-active.png')
const DappInactive = require('../../asset/icon/dapp.png')
const DappActive = require('../../asset/icon/dapp-active.png')
const U2UInactive = require('../../asset/icon/u2u-active.png')
const U2UActive = require('../../asset/icon/u2u-active.png')
const InvestionInactive = require('../../asset/icon/investment.png')
const InvestionActive = require('../../asset/icon/investment.png')
const WalletInactive = require('../../asset/icon/wallet.png')
const WalletActive = require('../../asset/icon/wallet-active.png')

const Icon = ({name, width, height, style}: {
  name: string;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ImageStyle
}) => {
  switch (name) {
    case 'home':
      return (
        <Image
          source={HomeInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'home-active':
      return (
        <Image
          source={HomeActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'dapp': 
      return (
        <Image
          source={DappInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'dapp-active':
      return (
        <Image
          source={DappActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'u2u': 
      return (
        <Image
          source={U2UInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'u2u-active':
      return (
        <Image
          source={U2UActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'investment': 
      return (
        <Image
          source={InvestionInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'investment-active': 
      return (
        <Image
          source={InvestionActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'wallet': 
      return (
        <Image
          source={WalletInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'wallet-active':
      return (
        <Image
          source={WalletActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    default:
      return null
  }
};

export default Icon;