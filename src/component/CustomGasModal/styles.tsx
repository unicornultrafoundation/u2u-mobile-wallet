import { StyleSheet } from "react-native";
import { getPhonePaddingBottom } from "../../util/platform";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom()
  },
  inputContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 52,
    minHeight: 50,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  }
})