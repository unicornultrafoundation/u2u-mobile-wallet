import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    paddingBottom: getPhonePaddingBottom()
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTokenSymbolText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.38
  },
  balanceCardContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 16
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
  balanceNumberInToken: {
    fontSize: 34,
    fontWeight: '500',
    lineHeight: 41,
    letterSpacing: 0.37,
    textAlign: 'center',
    marginBottom: 8
  },
  balanceContainer: {
    marginBottom: 24
  }
});
