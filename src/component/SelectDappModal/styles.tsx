import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    marginTop: 12,
    marginBottom: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
