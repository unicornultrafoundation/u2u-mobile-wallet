import { StyleSheet } from 'react-native';
import { getPhonePaddingTop } from '../../util/platform';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop()
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  headerIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderBottomWidth: 2,
    marginVertical: 12
  },
  addressText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.5
  },
  networkText: {
    marginRight: 4,
    color: theme.color.neutral[500],
    fontSize: 12,
    lineHeight: 16
  },
  balanceCardContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 16
  },
  balanceText: {
    marginRight: 4,
    color: theme.color.neutral[500],
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500'
  },
  balanceNumberInFiatText: {
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 41,
    letterSpacing: 0.37,
    textAlign: 'center',
    marginVertical: 8
  },
  balanceNumberInU2U: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 16
  },
  balanceCardVisibleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceActionButton: {
    padding: 10,
    borderRadius: 44,
    backgroundColor: theme.color.primary[500],
  },
  balanceActionButtonText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: theme.color.neutral[500],
    textAlign: 'center',
    marginTop: 4
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4
  }
});
