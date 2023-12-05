import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom(),
    // overflow: 'scroll',
  },
  section: {
    paddingHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4
  },
  txHistoryContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    marginVertical: 8
  },
  txTraitContainer: {
    flexDirection: 'row', 
    gap: 8,
  },
  txRowContainer: {
    flexDirection: 'row', 
    paddingTop: 8, 
    paddingBottom: 12, 
    gap: 8,
  }
})
