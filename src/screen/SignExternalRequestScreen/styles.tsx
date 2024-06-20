import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  dappInfoContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  requestInfoContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 16
  }
})
