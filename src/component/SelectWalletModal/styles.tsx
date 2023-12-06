import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom } from '../../util/platform';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    // paddingBottom: getPhonePaddingBottom(),
    position: 'relative'
  },
  walletRowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});
