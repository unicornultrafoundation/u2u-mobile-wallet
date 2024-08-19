import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.38
  },
  messageRow: {
    width: '100%',
    padding: 16,
    gap: 4
  },
  messageContainer: {
    borderRadius: 16,
    padding: 16,
    maxWidth: 227
  },
  optionsContainer: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    width: 260,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  optionWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  optionTouchable: {
    // underlayColor: '#FFFFFF',
    // activeOpacity: 100,
  },
});
