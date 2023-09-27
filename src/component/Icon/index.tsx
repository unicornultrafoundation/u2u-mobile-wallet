import React from 'react';
// import HomeInactive from '../../asset/icon/home.png'
import { DimensionValue, Image, ImageStyle, View } from 'react-native';
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

  const renderIcon = () => {
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
          <View style={style}>
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
          </View>
        )
      case 'copy':
        return (
          <View style={style}>
            <Svg 
              width={`${w}`}
              height={`${h}`}
              viewBox={`0 0 ${w} ${h}`}
              fill="none"
            >
              <Path
                d="M6 6V4.13346C6 3.38673 6 3.01308 6.14532 2.72786C6.27316 2.47698 6.47698 2.27316 6.72786 2.14532C7.01308 2 7.38673 2 8.13346 2H11.8668C12.6135 2 12.9867 2 13.2719 2.14532C13.5228 2.27316 13.727 2.47698 13.8548 2.72786C14.0001 3.01308 14.0001 3.38645 14.0001 4.13319V7.86654C14.0001 8.61327 14.0001 8.98664 13.8548 9.27186C13.727 9.52274 13.5226 9.72699 13.2717 9.85482C12.9868 10 12.614 10 11.8687 10H10M6 6H4.13346C3.38673 6 3.01308 6 2.72786 6.14532C2.47698 6.27316 2.27316 6.47698 2.14532 6.72786C2 7.01308 2 7.38673 2 8.13346V11.8668C2 12.6135 2 12.9867 2.14532 13.2719C2.27316 13.5228 2.47698 13.727 2.72786 13.8548C3.0128 14 3.386 14 4.13127 14H7.86903C8.61431 14 8.98698 14 9.27192 13.8548C9.5228 13.727 9.72699 13.5226 9.85482 13.2717C10 12.9868 10 12.614 10 11.8687V10M6 6H7.8668C8.61353 6 8.98671 6 9.27192 6.14532C9.5228 6.27316 9.72699 6.47698 9.85482 6.72786C10 7.0128 10 7.386 10 8.1313L10 10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        )
      default:
        return null
    }
  }

  return renderIcon()
};

export default Icon;