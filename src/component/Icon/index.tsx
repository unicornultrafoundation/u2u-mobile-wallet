import React from 'react';
// import HomeInactive from '../../asset/icon/home.png'
import { DimensionValue, Image, ImageStyle } from 'react-native';

const DiscoverInactive = require('../../asset/icon/discover.png')
const DiscoverActive = require('../../asset/icon/discover-active.png')
const EcosystemInactive = require('../../asset/icon/ecosystem.png')
const EcosystemActive = require('../../asset/icon/ecosystem-active.png')
const BrowserInactive = require('../../asset/icon/browser.png')
const BrowserActive = require('../../asset/icon/browser-active.png')
const StakingInactive = require('../../asset/icon/staking.png')
const StakingActive = require('../../asset/icon/staking-active.png')
const WalletInactive = require('../../asset/icon/wallet.png')
const WalletActive = require('../../asset/icon/wallet-active.png')

const Icon = ({name, width, height, style}: {
  name: string;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ImageStyle
}) => {
  switch (name) {
    case 'discover':
      return (
        <Image
          source={DiscoverInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'discover-active':
      return (
        <Image
          source={DiscoverActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'ecosystem': 
      return (
        <Image
          source={EcosystemInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'ecosystem-active':
      return (
        <Image
          source={EcosystemActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'browser': 
      return (
        <Image
          source={BrowserInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'browser-active':
      return (
        <Image
          source={BrowserActive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'staking': 
      return (
        <Image
          source={StakingInactive}
          style={[
            style,
            {
              width: width || 24,
              height: height || 24
            }
          ]}
        />
      )
    case 'staking-active': 
      return (
        <Image
          source={StakingActive}
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