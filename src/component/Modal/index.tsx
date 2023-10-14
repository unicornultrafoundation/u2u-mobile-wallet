import { View, Modal as RNModal, Pressable, ModalProps } from 'react-native';
import React from 'react';
import styles from './styles';

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
      <View style={styles.modalWrapper}>
        <Pressable onPress={onRequestClose} style={styles.overlay} />
        {children}
      </View>
    </RNModal>
  );
};

export default Modal;
