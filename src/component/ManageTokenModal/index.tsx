import { usePreference } from '../../hook/usePreference';
import React, { useMemo } from 'react'
import ModalContent from './ModalContent';
import CustomBottomSheetModal from '../CustomBottomSheetModal';

const ManageTokenModal = ({trigger}: {
  trigger: () => JSX.Element,
}) => {
  const {preferenceTheme} = usePreference()
  // ref
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  // const snapPoints = useMemo(() => ['75%'], []);

  return (
    <CustomBottomSheetModal
      title='manageToken'
      trigger={trigger()}
      triggerModal={<ModalContent/>}
      snapPoints={['75%']}
      hasSeparator={false}
    />
  )
}

export default ManageTokenModal;
