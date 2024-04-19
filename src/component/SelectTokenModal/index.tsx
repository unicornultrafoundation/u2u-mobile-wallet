import { usePreference } from '../../hook/usePreference';
import React, { useMemo, useRef } from 'react'
import ModalContent from './ModalContent';
import CustomBottomSheetModal from '../CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const SelectTokenModal = ({trigger, onSelect}: {
  trigger: () => JSX.Element,
  onSelect: (tokenObj: any) => void;
}) => {
  const {preferenceTheme} = usePreference()
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['75%'], []);

  return (
    <CustomBottomSheetModal
      modalRef={bottomSheetModalRef}
      title='selectToken'
      trigger={trigger()}
      triggerModal={
        <ModalContent
          onSelect={(tokenObj) => {
            onSelect(tokenObj);
            bottomSheetModalRef.current?.close()
          }}
        />}
      snapPoints={snapPoints}
      hasSeparator={false}
    />
  )
}

export default SelectTokenModal;
