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
  },
});
