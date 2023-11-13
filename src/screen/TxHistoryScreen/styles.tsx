import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom(),
    paddingHorizontal: 16
  },
  txRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  txTypeText: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16
  },
  txTypeDescriptionText: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.07
  },
  amountText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.08
  },
  dateText: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.07
  }
});
