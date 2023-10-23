import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(24, 24, 24, 0.9)',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
