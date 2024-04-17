import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%'
  },
  toggleContainer: {
    borderRadius: 16,
    padding: 4,
    flexDirection: 'row',
    width: 73,
    height: 40
  },
  toggleItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  settingItemTextContainer: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flex: 1,
    gap: 2,
  }
});
