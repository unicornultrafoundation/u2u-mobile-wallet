import React from 'react';
// import HomeInactive from '../../asset/icon/home.png'
import { DimensionValue, Image, ImageStyle } from 'react-native';
import { Svg, Path } from 'react-native-svg'

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
  const w = width || 24
  const h = height || 24

  switch (name) {
    case 'discover':
      return (
        <Image
          source={DiscoverInactive}
          style={[
            style,
            {
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
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
              width: w,
              height: h
            }
          ]}
        />
      )
    case 'arrow-left':
      return (
        <Svg
          width={`${w}`}
          height={`${h}`}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
        >
          <Path
            d="M21.9887 12.1703L22 11.9827C22 11.2204 21.4463 10.5914 20.7307 10.4991L20.5486 10.4875L7.01376 10.4887L10.9001 6.46994C11.3215 5.95889 11.3611 5.21531 10.9965 4.6596L10.875 4.49894C10.3848 3.9336 9.57289 3.84268 8.98108 4.25695L8.82554 4.38248L2.48302 10.8035C1.88993 11.3523 1.84281 12.2795 2.34284 12.8883L8.82516 19.614C9.42036 20.1686 10.3381 20.1198 10.875 19.505C11.3671 18.9414 11.3684 18.0979 10.9068 17.5341L7.08794 13.4792L20.5486 13.4779C21.2885 13.4779 21.8991 12.9075 21.9887 12.1703Z"
            fill="#D8D8D8"
          />
        </Svg>
      )
    default:
      return null
  }
};

export default Icon;