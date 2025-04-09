import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '@/util/platform';
import theme from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom(),
  },
  headerContainer: {
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.38
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
    // justifyContent: 'space-between'
  },
  cardContainer: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  cardColumn: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    direction: 'rtl'
  },
  otpContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  otpInput: {
    textAlign: 'center',
    width: 46,
    height: 48,
    color: '#FFFFFF',
    fontSize: 24,
    padding: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.color.neutral[600]
  },
});
