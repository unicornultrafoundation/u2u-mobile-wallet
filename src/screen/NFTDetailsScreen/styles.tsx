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
    alignItems: 'center'
  }
})