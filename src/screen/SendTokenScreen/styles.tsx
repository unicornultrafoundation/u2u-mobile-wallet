import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom(),
  },
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
});
