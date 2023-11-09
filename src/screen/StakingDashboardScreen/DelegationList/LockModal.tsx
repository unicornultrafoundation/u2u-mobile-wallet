import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Text from '../../../component/Text';
import theme from '../../../theme';
import { styles } from './styles';
import { SvgUri } from 'react-native-svg';
import { Validation } from '../../../service/staking';
import { formatNumberString, parseFormatedNumberInput, shortenAddress } from '../../../util/string';
import { useTranslation } from 'react-i18next';
import Separator from '../../../component/Separator';
import BigNumber from 'bignumber.js';
import { useFetchLockedStake } from '../../../hook/useFetchLockedStake';
import { useWallet } from '../../../hook/useWallet';
import { formatDate } from '../../../util/date';
import TextInput from '../../../component/TextInput';
import Button from '../../../component/Button';

const LockModal = ({trigger, item}: {
  trigger: () => JSX.Element,
  item: Validation
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  const {t} = useTranslation<string>()

  const { wallet } = useWallet()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const [amount, setAmount] = useState('0')
  const [duration, setDuration] = useState('0')

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderForm = () => {
    return (
      <View style={{width: '100%', flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              theme.typography.footnote.regular
            ]}
          >
            Amount
          </Text>
          <Text
            style={[
              theme.typography.footnote.regular
            ]}
          >
            Available: 
          </Text>
        </View>
        <TextInput
          value={amount}
          onChangeText={(val) => {
            setAmount(parseFormatedNumberInput(val))
          }}
          keyboardType="numeric"
          containerStyle={{
            marginVertical: 8
          }}
        />
        <Text
          style={[
            theme.typography.footnote.regular
          ]}
        >
          Locked duration (days)
        </Text>
        <TextInput
          value={duration}
          onChangeText={(val) => {
            setDuration(parseFormatedNumberInput(val))
          }}
          keyboardType="numeric"
          containerStyle={{
            marginVertical: 8
          }}
        />
        <View
          style={{width: '100%', flex: 1, justifyContent: 'flex-end'}}
        >
          <Button
            fullWidth
            style={{
              borderRadius: 60
            }}
            // onPress={handleClose}
          >
            Lock
          </Button>
        </View>
      </View>
    )
  }

  return (
    <>
      <TouchableOpacity
        onPress={handlePresentModalPress}
      >
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: preferenceTheme.background.background,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6'
        }}
        backdropComponent={({ style }) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: '#181818',
                  opacity: 0.9,
                }
              ]}
            />
          )
        }}
      >
        <View style={[
          styles.contentContainer,
          {
            backgroundColor: preferenceTheme.background.background
          }
        ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: 34, height: 34, marginRight: 8}}>
              <SvgUri
                uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
                width="100%"
                height="100%"
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'space-between'}}
            >
              <Text
                style={[
                  theme.typography.caption1.medium,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {item.validator.name}
              </Text>
              <Text
                style={[
                  theme.typography.caption1.regular,
                  {
                    color: preferenceTheme.text.primary
                  }
                ]}
              >
                {shortenAddress(item.validator.auth, 8, 8)}
              </Text>
            </View>
          </View>
          <Separator style={{width: '100%'}} />
          {renderForm()}

        </View>
      </BottomSheetModal>
    </>
  )
}

export default LockModal;
