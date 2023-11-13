import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';
import { TABBAR_HEIGHT } from '../../component/CustomBottomTab';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: TABBAR_HEIGHT
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 17
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 9
  },
  settingItemTextContainer: {
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    flex: 1
  }
});
