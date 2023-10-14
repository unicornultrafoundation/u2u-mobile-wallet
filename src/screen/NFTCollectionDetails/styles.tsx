import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import { TABBAR_HEIGHT } from '../../component/CustomBottomTab';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - TABBAR_HEIGHT,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom(),
    overflow: 'scroll'
  },
  section: {
    paddingHorizontal: 16
  },
  banner: {
    width: '100%',
    height: 120,
    position: 'relative'
  },
  bannerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 42,
    overflow: 'visible',
    marginTop: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.06,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  bannerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 4,
  }
})