import React from 'react';
// import HomeInactive from '../../asset/icon/home.png'
import { DimensionValue, Image, ImageStyle, View } from 'react-native';
import { Svg, Path, Rect, Stop, LinearGradient, Defs, G, ClipPath, Circle } from 'react-native-svg'

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

const Icon = ({name, width, height, color, style}: {
  name: string;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ImageStyle
  color?: string;
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
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg
              width="100%"
              height="100%"
              viewBox={`0 0 24 24`}
              fill="none"
            >
              <Path
                d="M21.9887 12.1703L22 11.9827C22 11.2204 21.4463 10.5914 20.7307 10.4991L20.5486 10.4875L7.01376 10.4887L10.9001 6.46994C11.3215 5.95889 11.3611 5.21531 10.9965 4.6596L10.875 4.49894C10.3848 3.9336 9.57289 3.84268 8.98108 4.25695L8.82554 4.38248L2.48302 10.8035C1.88993 11.3523 1.84281 12.2795 2.34284 12.8883L8.82516 19.614C9.42036 20.1686 10.3381 20.1198 10.875 19.505C11.3671 18.9414 11.3684 18.0979 10.9068 17.5341L7.08794 13.4792L20.5486 13.4779C21.2885 13.4779 21.8991 12.9075 21.9887 12.1703Z"
                fill="#D8D8D8"
              />
            </Svg>
          </View>
        )
      case 'chevron-down':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox={`0 0 8 8`} fill="none">
              <Path d="M6.33341 2.83325L4.00008 5.16659L1.66675 2.83325" stroke={color || "#8D8D8D"} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'chevron-right':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
              <Path d="M5.6665 3.33341L10.3332 8.00008L5.6665 12.6667" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'copy':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg 
              width="100%"
              height="100%"
              viewBox={`0 0 16 16`}
              fill="none"
            >
              <Path
                d="M6 6V4.13346C6 3.38673 6 3.01308 6.14532 2.72786C6.27316 2.47698 6.47698 2.27316 6.72786 2.14532C7.01308 2 7.38673 2 8.13346 2H11.8668C12.6135 2 12.9867 2 13.2719 2.14532C13.5228 2.27316 13.727 2.47698 13.8548 2.72786C14.0001 3.01308 14.0001 3.38645 14.0001 4.13319V7.86654C14.0001 8.61327 14.0001 8.98664 13.8548 9.27186C13.727 9.52274 13.5226 9.72699 13.2717 9.85482C12.9868 10 12.614 10 11.8687 10H10M6 6H4.13346C3.38673 6 3.01308 6 2.72786 6.14532C2.47698 6.27316 2.27316 6.47698 2.14532 6.72786C2 7.01308 2 7.38673 2 8.13346V11.8668C2 12.6135 2 12.9867 2.14532 13.2719C2.27316 13.5228 2.47698 13.727 2.72786 13.8548C3.0128 14 3.386 14 4.13127 14H7.86903C8.61431 14 8.98698 14 9.27192 13.8548C9.5228 13.727 9.72699 13.5226 9.85482 13.2717C10 12.9868 10 12.614 10 11.8687V10M6 6H7.8668C8.61353 6 8.98671 6 9.27192 6.14532C9.5228 6.27316 9.72699 6.47698 9.85482 6.72786C10 7.0128 10 7.386 10 8.1313L10 10"
                stroke={color || "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        )
      case 'notification':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M3.50083 13.7871V13.5681C3.53295 12.9202 3.7406 12.2925 4.10236 11.7496C4.7045 11.0975 5.1167 10.2983 5.29571 9.43598C5.29571 8.7695 5.29571 8.0935 5.35393 7.42703C5.65469 4.21842 8.82728 2 11.9611 2H12.0387C15.1725 2 18.345 4.21842 18.6555 7.42703C18.7137 8.0935 18.6555 8.7695 18.704 9.43598C18.8854 10.3003 19.2972 11.1019 19.8974 11.7591C20.2618 12.2972 20.4698 12.9227 20.4989 13.5681V13.7776C20.5206 14.648 20.2208 15.4968 19.6548 16.1674C18.907 16.9515 17.8921 17.4393 16.8024 17.5384C13.607 17.8812 10.383 17.8812 7.18762 17.5384C6.09914 17.435 5.08576 16.9479 4.33521 16.1674C3.778 15.4963 3.48224 14.6526 3.50083 13.7871Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M9.55493 20.8518C10.0542 21.4785 10.7874 21.884 11.5922 21.9788C12.3971 22.0735 13.2072 21.8495 13.8433 21.3564C14.0389 21.2106 14.2149 21.041 14.3672 20.8518" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'u2u':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox={`0 0 28 28`} fill="none">
              <Rect width="28" height="28" rx="14" fill="url(#paint0_linear_428_24012)"/>
              <Path d="M13.3058 22.7009C11.1883 21.4792 9.12887 20.291 7.02132 19.0751C7.51261 18.9042 7.59027 18.5659 7.58855 18.1431C7.57724 15.3724 7.57975 12.6018 7.58648 9.83123C7.58743 9.43124 7.5278 9.08964 7 8.93491C7.96273 8.37967 8.8522 7.86676 9.82262 7.30711C9.82262 7.63626 9.82262 7.86788 9.82262 8.0995C9.82495 11.4147 9.82495 14.7344 9.82495 18.0472C9.82132 18.553 9.95439 18.8164 10.408 19.07C10.7744 19.2749 10.8294 19.2938 11.1097 19.4511C11.1097 19.2236 11.1112 19.0851 11.1097 18.9242C11.1097 14.9654 11.1174 11.0626 11.1097 7.02961C11.1087 6.69441 11.185 6.48992 11.4932 6.33035C12.0907 6.02107 12.6651 5.66703 13.3058 5.29883V22.7009Z" fill="#181818"/>
              <Path fillRule="evenodd" clipRule="evenodd" d="M20.9786 19.0751L14.6941 22.7009V5.29883C14.8849 5.40848 15.0699 5.51688 15.2513 5.62322C15.679 5.87393 16.0872 6.11318 16.5068 6.33035C16.8149 6.48992 16.8912 6.69441 16.8903 7.02961C16.8851 9.71894 16.8868 12.3504 16.8886 14.9792C16.8894 16.2925 16.8903 17.6053 16.8903 18.9242C16.8893 19.0266 16.8896 19.12 16.8899 19.233C16.8901 19.2975 16.8903 19.3685 16.8903 19.4511C17.0233 19.3765 17.1055 19.333 17.1944 19.286C17.2929 19.234 17.3994 19.1776 17.592 19.07C18.0455 18.8164 18.1786 18.553 18.175 18.0472V18.0432C18.175 14.7316 18.175 11.4134 18.1773 8.0995V7.30711L20.9999 8.93491C20.4721 9.08964 20.4125 9.43124 20.4135 9.83123C20.4202 12.6018 20.4227 15.3724 20.4114 18.1431C20.4097 18.5659 20.4873 18.9042 20.9786 19.0751ZM16.0375 7.02532L15.7909 6.5252L15.5445 7.02532L14.9932 7.10549L15.3921 7.49478L15.2979 8.04441L15.7909 7.78488L16.284 8.04441L16.1899 7.49478L16.5888 7.10549L16.0375 7.02532Z" fill="#181818"/>
              <Defs>
              <LinearGradient id="paint0_linear_428_24012" x1="21.875" y1="5.25" x2="-2.00793e-06" y2="28" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#33CC99"/>
                <Stop offset="1" stopColor="#714CF9"/>
              </LinearGradient>
              </Defs>
            </Svg>
          </View>
        )
      case 'scan':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
              <Path d="M22.6315 13.0144H1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M20.7501 8.7779V6.82514C20.7501 4.996 19.2541 3.5 17.425 3.5H15.7812" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M3.38159 8.7779V6.82095C3.38159 4.98867 4.86607 3.50314 6.69835 3.50105L8.37873 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M20.7501 13.0144V17.5454C20.7501 19.3735 19.2541 20.8705 17.425 20.8705H15.7812" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M3.38159 13.0144V17.5495C3.38159 19.3818 4.86607 20.8674 6.69835 20.8695L8.37873 20.8705" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'eye':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
              <Path d="M1.93958 8.78109C1.71187 8.28568 1.71187 7.71416 1.93958 7.21875C2.99365 4.92554 5.31098 3.33325 8.0002 3.33325C10.6894 3.33325 13.0067 4.92554 14.0608 7.21875C14.2885 7.71416 14.2885 8.28568 14.0608 8.78109C13.0067 11.0743 10.6894 12.6666 8.0002 12.6666C5.31098 12.6666 2.99365 11.0743 1.93958 8.78109Z" stroke="#8D8D8D" strokeWidth="1.5"/>
              <Path d="M10.0002 7.99992C10.0002 9.10449 9.10477 9.99992 8.0002 9.99992C6.89563 9.99992 6.0002 9.10449 6.0002 7.99992C6.0002 6.89535 6.89563 5.99992 8.0002 5.99992C9.10477 5.99992 10.0002 6.89535 10.0002 7.99992Z" stroke="#8D8D8D" strokeWidth="1.5"/>
            </Svg>
          </View>
        )
      case 'arrow-up':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
              <Path d="M12.2256 4.25L12.2256 19.25" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M6.20124 10.2998L12.2252 4.2498L18.2502 10.2998" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'arrow-down':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
              <Path d="M12.2744 19.75V4.75" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M18.2988 13.7002L12.2748 19.7502L6.24976 13.7002" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'swap':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
              <Path d="M17.3395 20.1642V6.54639" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M21.4173 16.0681L17.3395 20.1648L13.2617 16.0681" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M7.41127 3.83276V17.4505" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M3.3335 7.92894L7.41127 3.83228L11.4891 7.92894" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'paper':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M15.2368 2.76196H8.58376C6.52476 2.76196 4.74976 4.43096 4.74976 6.49096V17.204C4.74976 19.38 6.40876 21.115 8.58376 21.115H16.5728C18.6328 21.115 20.3018 19.265 20.3018 17.204V8.03796L15.2368 2.76196Z" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M14.9741 2.75024V5.65924C14.9741 7.07924 16.1231 8.23124 17.5421 8.23424C18.8591 8.23724 20.2061 8.23824 20.2971 8.23224" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M14.784 15.5579H9.38696" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12.7425 10.6057H9.38647" stroke="#272727" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'question-mark-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 21 20" fill="none">
              <Path d="M8.15626 7.3C8.37632 6.6985 8.81067 6.1913 9.38238 5.86822C9.95409 5.54514 10.6263 5.42704 11.2799 5.53484C11.9334 5.64264 12.5263 5.96937 12.9533 6.45718C13.3804 6.94498 13.6141 7.56237 13.6131 8.2C13.6131 10 10.8051 10.9 10.8051 10.9M10.88 14.5H10.8894M20.24 10C20.24 14.9706 16.0494 19 10.88 19C5.71063 19 1.52002 14.9706 1.52002 10C1.52002 5.02944 5.71063 1 10.88 1C16.0494 1 20.24 5.02944 20.24 10Z" stroke="#8D8D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'arrow-up-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 17" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M16.7083 8.49992C16.7083 4.24325 13.2574 0.791585 8.99992 0.791585C4.74325 0.791585 1.29159 4.24325 1.29159 8.49992C1.29159 12.7566 4.74325 16.2083 8.99992 16.2083C13.2574 16.2083 16.7083 12.7566 16.7083 8.49992Z" stroke={color || "#D21C1C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M11.8926 9.7019L9.00008 6.7969L6.10758 9.7019" stroke={color || "#D21C1C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'arrow-down-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 17" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M1.29175 8.50008C1.29175 12.7567 4.74258 16.2084 9.00008 16.2084C13.2567 16.2084 16.7084 12.7567 16.7084 8.50008C16.7084 4.24342 13.2567 0.791748 9.00008 0.791748C4.74258 0.791748 1.29175 4.24342 1.29175 8.50008Z" stroke={color || "#0FA44D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M6.10742 7.2981L8.99992 10.2031L11.8924 7.2981" stroke={color || "#0FA44D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'share':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 18" fill="none">
              <G clipPath="url(#clip0_546_15670)">
                <Path d="M11.8916 6.09083L7.6437 10.3671L2.67048 7.3061C2.01882 6.90493 2.1509 5.91523 2.88503 5.70215L14.6266 2.28558C15.2944 2.09234 15.9117 2.71834 15.7118 3.38917L12.228 15.1187C12.0098 15.8527 11.0312 15.9798 10.6357 15.3244L7.6437 10.3671" stroke={color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </G>
              <Defs>
                <ClipPath id="clip0_546_15670">
                  <Rect width="18" height="18" fill="white"/>
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        )
      case 'setting':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 18" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M15.6051 5.71765L15.1382 4.90758C14.7433 4.22214 13.8681 3.98568 13.1817 4.37898V4.37898C12.855 4.57145 12.4651 4.62605 12.0981 4.53075C11.7311 4.43545 11.417 4.19808 11.2252 3.87097C11.1018 3.66305 11.0355 3.42623 11.033 3.18447V3.18447C11.0441 2.79686 10.8979 2.42124 10.6276 2.14319C10.3573 1.86514 9.98596 1.70834 9.59819 1.7085H8.65769C8.27779 1.70849 7.91355 1.85987 7.64556 2.12915C7.37758 2.39842 7.22794 2.76338 7.22977 3.14328V3.14328C7.21851 3.92763 6.57942 4.55755 5.79499 4.55747C5.55322 4.55496 5.3164 4.48865 5.10849 4.36525V4.36525C4.42211 3.97195 3.5469 4.20841 3.15197 4.89385L2.65082 5.71765C2.25637 6.40223 2.48961 7.27689 3.17256 7.67417V7.67417C3.61649 7.93047 3.88996 8.40413 3.88996 8.91673C3.88996 9.42934 3.61649 9.903 3.17256 10.1593V10.1593C2.49048 10.5539 2.25698 11.4264 2.65082 12.109V12.109L3.12451 12.9259C3.30955 13.2598 3.62001 13.5062 3.98721 13.6105C4.3544 13.7149 4.74804 13.6686 5.08103 13.482V13.482C5.40837 13.2909 5.79845 13.2386 6.16457 13.3366C6.53068 13.4346 6.84249 13.6747 7.03068 14.0037C7.15408 14.2116 7.22039 14.4484 7.2229 14.6902V14.6902C7.2229 15.4826 7.86528 16.125 8.65769 16.125H9.59819C10.3879 16.125 11.0292 15.4868 11.033 14.6971V14.6971C11.0311 14.316 11.1817 13.95 11.4512 13.6805C11.7207 13.411 12.0867 13.2604 12.4678 13.2623C12.7089 13.2687 12.9448 13.3348 13.1543 13.4545V13.4545C13.8388 13.8489 14.7135 13.6157 15.1108 12.9328V12.9328L15.6051 12.109C15.7964 11.7806 15.8489 11.3894 15.751 11.0222C15.653 10.655 15.4127 10.342 15.0833 10.1524V10.1524C14.7539 9.96291 14.5136 9.64987 14.4157 9.28265C14.3177 8.91542 14.3703 8.5243 14.5616 8.19591C14.686 7.97869 14.8661 7.79859 15.0833 7.67417V7.67417C15.7622 7.27711 15.9949 6.40756 15.6051 5.72451V5.72451V5.71765Z" stroke={color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Circle cx="9.13141" cy="8.91681" r="1.97712" stroke={color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'error':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 18" fill="none">
              <Path fillRule="evenodd" clipRule="evenodd" d="M9 2.06274C12.8318 2.06274 15.9375 5.16924 15.9375 9.00024C15.9375 12.8312 12.8318 15.9377 9 15.9377C5.169 15.9377 2.0625 12.8312 2.0625 9.00024C2.0625 5.16924 5.169 2.06274 9 2.06274Z" stroke={color || "#D21C1C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M8.99609 6.15332V9.46757" stroke={color || "#D21C1C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M8.99625 11.8472H9.00375" stroke={color || "#D21C1C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'wallet-icon': 
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
              <Rect width="24" height="24" rx="12" fill="url(#paint0_linear_526_12784)"/>
              <Path d="M18.4258 13.5972H15.7269C14.736 13.5965 13.9327 12.7939 13.9321 11.803C13.9321 10.812 14.736 10.0094 15.7269 10.0088H18.4258" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M16.0322 11.7618H15.8244" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <Path fillRule="evenodd" clipRule="evenodd" d="M9.16495 6H14.9272C16.8593 6 18.4257 7.56634 18.4257 9.49844V14.2831C18.4257 16.2152 16.8593 17.7816 14.9272 17.7816H9.16495C7.23284 17.7816 5.6665 16.2152 5.6665 14.2831V9.49844C5.6665 7.56634 7.23284 6 9.16495 6Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M8.69043 9.02547H12.2897" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <Defs>
                <LinearGradient id="paint0_linear_526_12784" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                  <Stop stopColor="#29A37A"/>
                  <Stop offset="1" stopColor="#1F7A5C"/>
                </LinearGradient>
              </Defs>
            </Svg>
          </View>
        )
      case 'scan':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 18 18" fill="none">
              <Path d="M16.9736 9.76074H1.125" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M15.5626 6.58343V5.11886C15.5626 3.747 14.4406 2.625 13.0687 2.625H11.8359" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M2.53613 6.58343V5.11571C2.53613 3.7415 3.64949 2.62736 5.0237 2.62579L6.28399 2.625" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M15.5626 9.76074V13.159C15.5626 14.53 14.4406 15.6528 13.0687 15.6528H11.8359" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M2.53613 9.76074V13.1621C2.53613 14.5363 3.64949 15.6505 5.0237 15.652L6.28399 15.6528" stroke={color || "#8D8D8D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'search':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 25 25" fill="none">
              <Circle cx="12.2867" cy="12.2664" r="8.98856" stroke="#8D8D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M18.5383 18.9849L22.0624 22.4997" stroke="#8D8D8D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
        )
      case 'twitter-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 14 15" fill="none">
              <Path
                d="M9.23678 3.88916H10.4294L7.82385 6.94842L10.8891 11.1114H8.48904L6.60922 8.58657L4.45828 11.1114H3.26492L6.05184 7.83916L3.11133 3.88916H5.57233L7.27152 6.19694L9.23678 3.88916ZM8.81821 10.378H9.47906L5.21324 4.58397H4.50407L8.81821 10.378Z"
                fill={color || '#363636'}
              />
              <Rect x="0.611274" y="1.11127" width="12.7778" height="12.7778" rx="6.38889" stroke={color || '#363636'} strokeWidth="0.555556"/>
            </Svg>
          </View>
        )
      case 'facebook-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 17" fill="none">
              <G clipPath="url(#clip0_752_25813)">
                <Path
                  d="M8.94636 6.98933V8.47751H10.7777L10.4877 10.4822H8.94636V15.1008C8.63732 15.1439 8.32114 15.1664 8.0002 15.1664C7.62973 15.1664 7.26593 15.1367 6.91166 15.0793V10.4822H5.22266V8.47751H6.91166V6.65666C6.91166 5.52701 7.82258 4.61084 8.94684 4.61084V4.6118C8.95017 4.6118 8.95303 4.61084 8.95636 4.61084H10.7782V6.34457H9.58777C9.23397 6.34457 8.94684 6.6332 8.94684 6.98885L8.94636 6.98933Z"
                  fill={color || '#363636'}
                />
              </G>
              <Rect x="1.61127" y="2.11127" width="12.7778" height="12.7778" rx="6.38889" stroke={color || '#363636'} strokeWidth="0.555556"/>
              <Defs>
                <ClipPath id="clip0_752_25813">
                  <Rect x="1.3335" y="1.8335" width="13.3333" height="13.3333" rx="6.66667" fill="white"/>
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        )
      case 'telegram-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 17" fill="none">
              <Path
                d="M3.76219 8.68767C3.78024 8.67865 3.79831 8.67007 3.81591 8.66195C4.1219 8.52023 4.43196 8.38755 4.74156 8.25487C4.75826 8.25487 4.78624 8.23546 4.80203 8.22914C4.82595 8.21876 4.84988 8.20883 4.8738 8.19845C4.91983 8.17859 4.96587 8.15918 5.01145 8.13932C5.10352 8.10006 5.19513 8.06079 5.2872 8.02153C5.47089 7.943 5.65458 7.86447 5.83826 7.78549C6.20564 7.62843 6.57347 7.47092 6.94084 7.31386C7.30822 7.1568 7.67604 6.99929 8.04342 6.84223C8.41079 6.68517 8.77861 6.52767 9.14599 6.37061C9.51336 6.21355 9.88119 6.05603 10.2486 5.89897C10.3303 5.86377 10.4187 5.81141 10.5063 5.79607C10.5798 5.78298 10.6516 5.75771 10.7256 5.74372C10.866 5.71709 11.0208 5.70626 11.1553 5.76448C11.2017 5.78479 11.2446 5.81322 11.2803 5.84888C11.4509 6.01767 11.427 6.29478 11.3908 6.53217C11.1395 8.18671 10.8881 9.8417 10.6362 11.4962C10.6019 11.7232 10.555 11.9724 10.3758 12.1159C10.2242 12.2373 10.0085 12.2508 9.82116 12.1994C9.63386 12.1475 9.46868 12.0387 9.30666 11.9318C8.63464 11.4868 7.96218 11.0418 7.29017 10.5968C7.1304 10.4911 6.95258 10.353 6.95439 10.1612C6.95529 10.0457 7.02433 9.9428 7.09474 9.85118C7.67875 9.08935 8.52136 8.56582 9.14825 7.83919C9.2367 7.73674 9.30621 7.5517 9.1848 7.49258C9.11259 7.45738 9.02954 7.50522 8.96365 7.5508C8.13503 8.12623 7.30686 8.70212 6.47824 9.27755C6.2079 9.4653 5.92447 9.65846 5.59862 9.7045C5.30707 9.74602 5.01371 9.66478 4.73164 9.58174C4.49515 9.51224 4.2591 9.44093 4.02396 9.36736C3.89894 9.32855 3.76987 9.28658 3.67328 9.19857C3.5767 9.11056 3.5212 8.96253 3.57942 8.84518C3.61597 8.77162 3.68683 8.72513 3.7613 8.68722L3.76219 8.68767Z"
                fill={color || '#363636'}
              />
              <Rect x="1.61127" y="2.11127" width="12.7778" height="12.7778" rx="6.38889" stroke={color || '#363636'} strokeWidth="0.555556"/>
            </Svg>
          </View>
        )
      case 'discord-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 17" fill="none">
              <Path
                d="M11.0808 5.719C10.5141 5.46315 9.9068 5.27475 9.27148 5.16698C9.25983 5.16486 9.24818 5.16995 9.24257 5.18056C9.1645 5.31719 9.07781 5.49582 9.01743 5.63584C8.33423 5.53528 7.65449 5.53528 6.98509 5.63584C6.92428 5.49242 6.83456 5.31719 6.75606 5.18056C6.75002 5.17037 6.73838 5.16528 6.72717 5.16698C6.09228 5.27475 5.48456 5.46315 4.91782 5.719C4.91307 5.72113 4.90876 5.72452 4.90574 5.72919C3.75327 7.42303 3.43754 9.07529 3.59239 10.7072C3.59325 10.7152 3.59756 10.7229 3.60403 10.7275C4.36443 11.277 5.10112 11.6105 5.824 11.8316C5.83565 11.835 5.84772 11.8307 5.85506 11.8214C6.02586 11.5919 6.17854 11.3496 6.30923 11.0946C6.31699 11.0797 6.30922 11.0619 6.2937 11.056C6.05173 10.9656 5.82184 10.8557 5.60014 10.7309C5.58246 10.7208 5.58117 10.6961 5.59713 10.6843C5.64371 10.6499 5.69029 10.6143 5.73472 10.5782C5.74291 10.5714 5.75412 10.5701 5.76361 10.5744C7.21843 11.2278 8.79358 11.2278 10.2311 10.5744C10.2406 10.5697 10.2518 10.5714 10.26 10.5778C10.3045 10.6138 10.351 10.6499 10.3981 10.6843C10.414 10.6961 10.4132 10.7208 10.3955 10.7309C10.1742 10.8582 9.94389 10.966 9.70149 11.056C9.68553 11.0619 9.67863 11.0797 9.68639 11.095C9.8201 11.3496 9.97235 11.5914 10.1401 11.8214C10.147 11.8312 10.1595 11.8354 10.1712 11.832C10.8975 11.611 11.6342 11.2775 12.3946 10.728C12.4011 10.7233 12.4054 10.7157 12.4062 10.708C12.5917 8.82154 12.0957 7.18287 11.092 5.73004C11.0895 5.72537 11.0856 5.72155 11.0804 5.71943L11.0808 5.719ZM6.52574 9.71344C6.08753 9.71344 5.72696 9.31799 5.72696 8.83215C5.72696 8.34632 6.08106 7.95086 6.52574 7.95086C6.97042 7.95086 7.33186 8.35014 7.32453 8.83215C7.32453 9.31799 6.97042 9.71344 6.52574 9.71344ZM9.47979 9.71344C9.04158 9.71344 8.68101 9.31799 8.68101 8.83215C8.68101 8.34632 9.03511 7.95086 9.47979 7.95086C9.92447 7.95086 10.2859 8.35014 10.2786 8.83215C10.2786 9.31799 9.92836 9.71344 9.47979 9.71344Z"
                fill={color || '#363636'}
              />
              <Rect x="1.61127" y="2.11127" width="12.7778" height="12.7778" rx="6.38889" stroke={color || '#363636'} strokeWidth="0.555556"/>
            </Svg>
          </View>
        )
      case 'youtube-circle':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 17" fill="none">
              <Path
                d="M12.0556 7.16588C12.0049 6.67666 11.8958 6.13585 11.4944 5.85164C11.1835 5.63125 10.7748 5.6231 10.3933 5.62355C9.58685 5.624 8.77994 5.62491 7.97347 5.62536C7.19779 5.62627 6.42209 5.62672 5.64641 5.62763C5.32237 5.62808 5.00739 5.60273 4.70644 5.74302C4.44802 5.8634 4.24573 6.0924 4.12399 6.34719C3.95519 6.70155 3.91989 7.10298 3.89952 7.49489C3.86196 8.20858 3.86603 8.92407 3.91084 9.63731C3.94387 10.1578 4.0276 10.733 4.42992 11.0647C4.78654 11.3584 5.28979 11.3729 5.7523 11.3733C7.22041 11.3747 8.68897 11.376 10.1575 11.3769C10.3458 11.3774 10.5422 11.3738 10.7341 11.353C11.1115 11.3122 11.4713 11.2041 11.7139 10.9244C11.9587 10.6424 12.0216 10.2501 12.0587 9.87853C12.1493 8.97703 12.1483 8.06693 12.0556 7.16588ZM7.12447 9.76403V7.23647L9.31306 8.50003L7.12447 9.76403Z"
                fill={color || '#363636'}
              />
              <Rect x="1.61127" y="2.11127" width="12.7778" height="12.7778" rx="6.38889" stroke={color || '#363636'} strokeWidth="0.555556"/>
            </Svg>
          </View>
        )
      case 'website':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 16 17" fill="none">
              <Path
                d="M2 8.5H5.33333M2 8.5C2 11.8137 4.68629 14.5 8 14.5M2 8.5C2 5.18629 4.68629 2.5 8 2.5M5.33333 8.5H10.6667M5.33333 8.5C5.33333 11.8137 6.52724 14.5 8 14.5M5.33333 8.5C5.33333 5.18629 6.52724 2.5 8 2.5M10.6667 8.5H14M10.6667 8.5C10.6667 5.18629 9.47276 2.5 8 2.5M10.6667 8.5C10.6667 11.8137 9.47276 14.5 8 14.5M14 8.5C14 5.18629 11.3137 2.5 8 2.5M14 8.5C14 11.8137 11.3137 14.5 8 14.5"
                stroke={color || '#363636'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        )
      case 'send':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 24 25" fill="none">
              <Path
                d="M15.8554 8.62111L10.1916 14.3227L3.56064 10.2415C2.69176 9.70657 2.86787 8.38697 3.8467 8.10287L19.5022 3.54743C20.3925 3.28978 21.2156 4.12446 20.949 5.01889L16.304 20.6582C16.013 21.6369 14.7082 21.8064 14.1809 20.9325L10.1916 14.3227"
                stroke={color || 'white'}
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