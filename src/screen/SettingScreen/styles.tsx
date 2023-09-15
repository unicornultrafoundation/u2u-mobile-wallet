import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#090909'
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
