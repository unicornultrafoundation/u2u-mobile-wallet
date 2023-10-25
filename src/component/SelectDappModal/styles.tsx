import {StyleSheet} from 'react-native';
import {getPhonePaddingBottom} from '../../util/platform';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom(),
  },
  title: {
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  walletRowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    position: 'relative',
  },
  socialIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
