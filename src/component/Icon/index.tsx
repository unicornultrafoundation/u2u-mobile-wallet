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
            <Svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
              <Path
                d="M5.0001 2.5H4.1001C3.54005 2.5 3.25981 2.5 3.0459 2.60899C2.85774 2.70487 2.70487 2.85774 2.60899 3.0459C2.5 3.25981 2.5 3.54005 2.5 4.1001V7.9001C2.5 8.46015 2.5 8.74003 2.60899 8.95394C2.70487 9.1421 2.85774 9.29524 3.0459 9.39111C3.2596 9.5 3.5395 9.5 4.09845 9.5H7.90155C8.4605 9.5 8.74 9.5 8.9537 9.39111C9.14186 9.29524 9.29524 9.14196 9.39111 8.95379C9.5 8.74009 9.5 8.4605 9.5 7.90155V7M10 4.5V2M10 2H7.5M10 2L6.5 5.5"
                stroke={color || '#8D8D8D'}
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        )
      case 'u2u-brand':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="101" height="22" viewBox="0 0 101 22" fill="none">
              <G clipPath="url(#clip0_813_4943)">
                <Path
                  d="M7.62841 21.052C5.06671 19.5739 2.57537 18.1366 0.0257861 16.6656C0.620119 16.4589 0.714077 16.0496 0.711989 15.5381C0.698313 12.1864 0.70134 8.83471 0.709483 5.48301C0.710631 4.99912 0.638493 4.58588 0 4.3987C1.16465 3.727 2.24068 3.10651 3.41462 2.42949C3.41462 2.82768 3.41462 3.10787 3.41462 3.38807C3.41744 7.39861 3.41744 11.4145 3.41744 15.4222C3.41306 16.034 3.57404 16.3527 4.12275 16.6594C4.56602 16.9073 4.63252 16.9302 4.9716 17.1205C4.9716 16.8454 4.97348 16.6777 4.9716 16.4831C4.9716 11.694 4.981 6.97262 4.9716 2.09379C4.97045 1.68829 5.06274 1.44091 5.43554 1.24787C6.15839 0.87372 6.85326 0.44543 7.62841 0V21.052Z"
                  fill={color || 'white'}
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.9107 16.6656L9.30811 21.052V0C9.53895 0.132654 9.76268 0.263787 9.98215 0.392423C10.4996 0.695727 10.9934 0.985147 11.501 1.24787C11.8738 1.44091 11.9661 1.68829 11.9649 2.09379C11.9586 5.34717 11.9607 8.53051 11.9628 11.7106C11.9639 13.2995 11.9649 14.8875 11.9649 16.4831C11.9637 16.607 11.964 16.7199 11.9644 16.8567C11.9647 16.9347 11.9649 17.0205 11.9649 17.1205C12.1258 17.0302 12.2253 16.9776 12.3328 16.9208C12.4519 16.8578 12.5808 16.7897 12.8138 16.6594C13.3625 16.3527 13.5235 16.034 13.5191 15.4222V15.4161C13.5191 11.4104 13.5191 7.39658 13.5219 3.38807V2.42949L16.9365 4.3987C16.298 4.58588 16.2259 4.99912 16.227 5.48301C16.2352 8.83471 16.2382 12.1864 16.2245 15.5381C16.2224 16.0496 16.3164 16.4589 16.9107 16.6656ZM10.9327 2.08807L10.6344 1.48305L10.3363 2.08807L9.66937 2.18506L10.1519 2.65599L10.038 3.3209L10.6344 3.00694L11.2309 3.3209L11.117 2.65599L11.5996 2.18506L10.9327 2.08807Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M29.0041 11.337C29.0041 11.9419 28.9531 12.4318 28.8509 12.8065C28.7134 13.2866 28.4678 13.7042 28.1142 14.0594C27.4816 14.6995 26.6487 15.0195 25.6153 15.0195C25.1124 15.0195 24.6488 14.9473 24.2244 14.8029C23.7451 14.639 23.3522 14.395 23.0457 14.0711C22.6685 13.6769 22.4171 13.2553 22.2913 12.8065C22.2363 12.6035 22.1971 12.3752 22.1735 12.1215C22.1578 11.9185 22.1499 11.657 22.1499 11.337V5.97412H24.4307V11.337C24.4307 11.5712 24.4425 11.7722 24.4661 11.94C24.4975 12.1547 24.5506 12.3362 24.6252 12.4845C24.8059 12.8475 25.1281 13.029 25.5918 13.029C26.0711 13.029 26.3933 12.8514 26.5583 12.4962C26.6251 12.3518 26.6722 12.1722 26.6997 11.9576C26.7155 11.8014 26.7233 11.5946 26.7233 11.337V5.97412H29.0041V11.337Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M34.715 14.8498V11.214C34.715 10.7808 34.6522 10.4588 34.5264 10.248C34.3653 9.97479 34.0785 9.83818 33.666 9.83818C33.2298 9.83818 32.9214 9.97089 32.7407 10.2363C32.5914 10.4549 32.5167 10.7866 32.5167 11.2316V14.8498H30.5129V8.19303H32.3812V8.90144H32.4106C32.7957 8.27695 33.4027 7.9647 34.2317 7.9647C34.9115 7.9647 35.4831 8.1579 35.9468 8.54431C36.2375 8.7863 36.4458 9.11221 36.5715 9.52203C36.6697 9.84209 36.7188 10.2304 36.7188 10.6871V14.8498H34.715Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M38.1392 7.49047V5.97412H40.143V7.49047H38.1392ZM38.1392 14.8498V8.19303H40.143V14.8498H38.1392Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M48.3646 12.3205C48.172 13.1324 47.7497 13.794 47.0974 14.3053C46.4491 14.8127 45.7007 15.0664 44.852 15.0664C43.8501 15.0664 43.0034 14.721 42.3118 14.0301C41.6164 13.3432 41.2687 12.502 41.2687 11.5068C41.2687 10.5193 41.6085 9.68401 42.2883 9.00097C42.9719 8.31012 43.8108 7.9647 44.8048 7.9647C45.6731 7.9647 46.4354 8.22035 47.0915 8.73166C47.7595 9.24686 48.1799 9.92405 48.3528 10.7632H46.3254C46.0346 10.1387 45.5356 9.82647 44.8284 9.82647C44.3608 9.82647 43.9837 9.99626 43.6968 10.3358C43.4218 10.6559 43.2843 11.0501 43.2843 11.5185C43.2843 11.9985 43.4277 12.3967 43.7145 12.7128C44.0131 13.0407 44.4001 13.2046 44.8756 13.2046C45.5317 13.2046 46.015 12.9099 46.3254 12.3205H48.3646Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M56.3739 11.5185C56.3739 12.5333 56.0282 13.3763 55.3367 14.0477C54.6491 14.719 53.7906 15.0547 52.7612 15.0547C51.7318 15.0547 50.8752 14.719 50.1916 14.0477C49.5 13.3763 49.1543 12.5333 49.1543 11.5185C49.1543 10.4998 49.5 9.65474 50.1916 8.98341C50.8752 8.31207 51.7318 7.97641 52.7612 7.97641C53.7906 7.97641 54.6491 8.31207 55.3367 8.98341C56.0282 9.65474 56.3739 10.4998 56.3739 11.5185ZM54.3701 11.5185C54.3701 11.0579 54.2188 10.6656 53.9163 10.3417C53.6059 10.006 53.2209 9.83818 52.7612 9.83818C52.3054 9.83818 51.9223 10.006 51.6119 10.3417C51.3094 10.6656 51.1581 11.0579 51.1581 11.5185C51.1581 11.9751 51.3094 12.3674 51.6119 12.6952C51.9223 13.027 52.3054 13.1929 52.7612 13.1929C53.2209 13.1929 53.6059 13.027 53.9163 12.6952C54.2188 12.3674 54.3701 11.9751 54.3701 11.5185Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M61.077 9.96698C60.5623 9.9826 60.189 10.0607 59.9572 10.2012C59.6508 10.3885 59.4975 10.7183 59.4975 11.1906V14.8498H57.4937V8.19303H59.3738V8.90144H59.4032C59.7215 8.27695 60.2794 7.9647 61.077 7.9647V9.96698Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M66.3164 14.8498V11.214C66.3164 10.7808 66.2535 10.4588 66.1278 10.248C65.9667 9.97479 65.6799 9.83818 65.2673 9.83818C64.8312 9.83818 64.5228 9.97089 64.342 10.2363C64.1927 10.4549 64.1181 10.7866 64.1181 11.2316V14.8498H62.1143V8.19303H63.9825V8.90144H64.012C64.3971 8.27695 65.0041 7.9647 65.8331 7.9647C66.5129 7.9647 67.0845 8.1579 67.5482 8.54431C67.8389 8.7863 68.0471 9.11221 68.1729 9.52203C68.2711 9.84209 68.3202 10.2304 68.3202 10.6871V14.8498H66.3164Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M80.3844 11.337C80.3844 11.9419 80.3333 12.4318 80.2311 12.8065C80.0936 13.2866 79.8481 13.7042 79.4944 14.0594C78.8619 14.6995 78.0289 15.0195 76.9956 15.0195C76.4926 15.0195 76.029 14.9473 75.6047 14.8029C75.1253 14.639 74.7324 14.395 74.426 14.0711C74.0488 13.6769 73.7973 13.2553 73.6716 12.8065C73.6166 12.6035 73.5773 12.3752 73.5537 12.1215C73.538 11.9185 73.5301 11.657 73.5301 11.337V5.97412H75.811V11.337C75.811 11.5712 75.8227 11.7722 75.8463 11.94C75.8778 12.1547 75.9308 12.3362 76.0054 12.4845C76.1862 12.8475 76.5084 13.029 76.972 13.029C77.4513 13.029 77.7735 12.8514 77.9385 12.4962C78.0053 12.3518 78.0525 12.1722 78.08 11.9576C78.0957 11.8014 78.1036 11.5946 78.1036 11.337V5.97412H80.3844V11.337Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M81.8931 14.8498V5.97412H83.8969V14.8498H81.8931Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M87.7514 9.70353V14.8498H85.7475V9.70353H84.7574V8.19303H85.7475V5.97412H87.7514V8.19303H88.7179V9.70353H87.7514Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M93.1499 9.96698C92.6352 9.9826 92.2619 10.0607 92.0301 10.2012C91.7236 10.3885 91.5704 10.7183 91.5704 11.1906V14.8498H89.5666V8.19303H91.4466V8.90144H91.4761C91.7943 8.27695 92.3523 7.9647 93.1499 7.9647V9.96698Z"
                  fill={color || 'white'}
                />
                <Path
                  d="M98.9963 14.8498V14.1296H98.9727C98.8038 14.4497 98.5229 14.6936 98.13 14.8615C97.7921 15.0059 97.4208 15.0781 97.0161 15.0781C96.0063 15.0781 95.1871 14.7327 94.5584 14.0418C93.9534 13.3705 93.6508 12.5294 93.6508 11.5185C93.6508 10.5232 93.9593 9.68791 94.5761 9.01268C95.2166 8.31402 96.0299 7.9647 97.0161 7.9647C97.4168 7.9647 97.7862 8.03886 98.1241 8.18717C98.5012 8.3511 98.7841 8.58919 98.9727 8.90144H98.9963V8.19303H101V14.8498H98.9963ZM98.9963 11.5185C98.9963 11.0306 98.8372 10.6266 98.5189 10.3066C98.2007 9.9865 97.7979 9.82647 97.3107 9.82647C96.8275 9.82647 96.4287 9.99431 96.1143 10.33C95.8079 10.6539 95.6546 11.0579 95.6546 11.5419C95.6546 12.0064 95.8138 12.4006 96.132 12.7245C96.4581 13.0524 96.855 13.2163 97.3225 13.2163C97.8058 13.2163 98.2066 13.0543 98.5248 12.7304C98.8391 12.4064 98.9963 12.0024 98.9963 11.5185Z"
                  fill={color || 'white'}
                />
              </G>
              <Defs>
                <ClipPath id="clip0_813_4943">
                  <Rect width="101" height="21.052" fill={color || 'white'}/>
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        )
      case 'favourite':
        return (
          <View style={[{width: width, height: height, aspectRatio: 1}, style]}>
            <Svg width="100%" height="100%" viewBox="0 0 28 28" fill="none">
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.382 9.15854L15.6229 11.794C15.6851 11.9269 15.8051 12.0196 15.9444 12.0411L18.7226 12.4648C18.8351 12.4807 18.9364 12.5429 19.0055 12.6379C19.1351 12.8161 19.1153 13.0684 18.9599 13.2217L16.9464 15.2773C16.844 15.3791 16.7985 15.5284 16.8253 15.6738L17.3075 18.5745C17.3413 18.8149 17.1859 19.0401 16.9582 19.0791C16.8639 19.0944 16.7674 19.0785 16.6817 19.0338L14.2073 17.6644C14.083 17.5931 13.9341 17.5931 13.8097 17.6644L11.3172 19.0412C11.1087 19.1532 10.8537 19.07 10.7401 18.8545C10.6967 18.7674 10.6817 18.6684 10.6967 18.5717L11.1789 15.671C11.203 15.5262 11.1575 15.3774 11.0578 15.275L9.03356 13.22C8.86853 13.0469 8.86746 12.7652 9.03195 12.591C9.03248 12.5904 9.03302 12.5893 9.03356 12.5887C9.1016 12.5237 9.18519 12.4801 9.27574 12.4631L12.0544 12.0394C12.1932 12.0163 12.3127 11.9246 12.3759 11.7917L13.6158 9.15854C13.6656 9.05163 13.754 8.96961 13.8612 8.93228C13.9689 8.89438 14.0868 8.90343 14.188 8.95716C14.2711 9.00072 14.3391 9.07143 14.382 9.15854Z"
                stroke={color || '#8D8D8D'}
                strokeWidth="0.954545"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke={color || '#363636'}/>
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