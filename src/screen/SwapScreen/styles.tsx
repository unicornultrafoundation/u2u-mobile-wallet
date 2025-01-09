import theme from '@/theme';
import { getPhonePaddingBottom } from '@/util/platform';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.38
  },
  swapContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16
  },
  balanceActionButton: {
    padding: 10,
    borderRadius: 44,
    backgroundColor: theme.color.primary[500],
  },
  selectTokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 20,
  },
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom() + 24
  },
  tokenContainer: {
    flexDirection: 'row',
    // width: '100%',
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  }
});
