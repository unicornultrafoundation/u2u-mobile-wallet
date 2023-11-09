import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom } from '../../../util/platform';

export const styles = StyleSheet.create({
  delegationItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom(),
    paddingTop: 16
  },
});
