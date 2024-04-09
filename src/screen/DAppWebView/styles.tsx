import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import theme from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom()
  },
  webview: {
    flex: 1,
    // flexGrow: 1
  },
  confirmTxContentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16
  },
  cardContainer: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 80,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  networkText: {
    marginRight: 4,
    color: theme.color.neutral[500],
    fontSize: 12,
    lineHeight: 16
  },
});
