import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';

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
});
