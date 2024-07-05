import { StyleSheet } from 'react-native';
import { getPhonePaddingBottom, getPhonePaddingTop } from '../../util/platform';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom()
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getPhonePaddingTop() + 8,
    paddingHorizontal: 16
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    // paddingBottom: getPhonePaddingBottom(),
    position: 'relative'
  },
  walletRowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  optionsContainer: {
    padding: 12,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.50)',
    width: 220,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
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