import { View, Modal as RNModal, Pressable, ModalProps } from 'react-native';
import React from 'react';
import styles from './styles';
import { BlurView } from '@react-native-community/blur';

interface Props extends ModalProps {
  visible?: boolean;
  children: React.ReactNode;
}

const Modal = ({ visible, onRequestClose, children, ...rest }: Props) => {

  return (
    <RNModal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={onRequestClose}
      style={{ flex: 1 }}
      {...rest}
    >
      {visible && (
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <View style={styles.modalWrapper}>
        <Pressable onPress={onRequestClose} style={styles.overlay} />
        {children}
      </View>
    </RNModal>
  );
};

export default Modal;
