import { Dimensions, StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import { TABBAR_HEIGHT } from '../../component/CustomBottomTab';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom() + TABBAR_HEIGHT,
    // overflow: 'scroll',
  },
  section: {
    paddingHorizontal: 16,
  },
  banner: {
    width: '100%',
    height: getPhonePaddingTop() + 120,
    position: 'relative',
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
    lineHeight: 25,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bannerAvatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 4,
  },
  modalAvatarWrapper: {
    position: 'absolute',
    bottom: -44,
    left: '50%',
    transform: [{ translateX: -44 }],
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  descriptionSection: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
});
