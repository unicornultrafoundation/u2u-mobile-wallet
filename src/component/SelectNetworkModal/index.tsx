import React, { useCallback, useRef, useMemo } from 'react'
import {
  BottomSheetModal, BottomSheetScrollView, TouchableOpacity
} from '@gorhom/bottom-sheet';
// import { TouchableOpacity } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_CHAINS } from '../../config/chain';
import Icon from '../Icon';
import { useNetwork } from '../../hook/useNetwork';
import { usePreference } from '../../hook/usePreference';
import CustomBottomSheetModal from '../CustomBottomSheetModal';

const SelectNetworkModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {preferenceTheme} = usePreference()
  const { t } = useTranslation<string>()

  const { chainId, switchNetwork } = useNetwork()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%'], []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderTriggerModal = () => {
    return (
      <BottomSheetScrollView bounces={false}>
        {SUPPORTED_CHAINS.map((item) => {
          const selected = chainId === item.chainID
          return (
            <TouchableOpacity
              key={`network-${item.chainID}`}
              style={{
                flexDirection: 'row',
                width: "100%",
                alignItems: 'center',
                justifyContent: selected ? "space-between" : "flex-start",
                paddingVertical: 8
              }}
              onPress={() => {
                switchNetwork(item.chainID)
                handleClose()
              }}
            >
              <Text
                style={[
                  theme.typography.label.bold,
                  {
                    color: preferenceTheme.text.title
                  }
                ]}
              >
                {item.name}
              </Text>
              {selected && (
                <Icon name="success" width={24} height={24} />
              )}
            </TouchableOpacity>
          )
        })}
      </BottomSheetScrollView>
    )
  }

  return (
    <CustomBottomSheetModal
      modalRef={bottomSheetModalRef}
      title={'selectNetwork'}
      trigger={trigger()}
      triggerModal={renderTriggerModal()}
      snapPoints={snapPoints}
      name={'titleNetwork'}
    />
  )
};

export default SelectNetworkModal;
