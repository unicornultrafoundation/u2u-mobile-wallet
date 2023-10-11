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
      default:
        return null
    }
  }

  return renderIcon()
};

export default Icon;