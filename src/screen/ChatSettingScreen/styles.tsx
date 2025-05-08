import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    // marginBottom: 16,
    height: 56,
    borderBottomWidth: 1
  },
  settingItemTextContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flex: 1,
    gap: 2,
  }
});
