import { StyleSheet } from 'react-native';
import { getPhonePaddingTop } from '../../util/platform';

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
    justifyContent: 'space-between'
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textPrimary: {
    color: '#F8F8F8'
  },
  textSubtle: {
    color: 'rgba(248, 248, 248, 0.40)'
  },
  separator: {
    borderBottomColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12
  }
});
