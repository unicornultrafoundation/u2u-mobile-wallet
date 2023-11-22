import { StyleSheet } from "react-native";
import { getPhonePaddingBottom } from "../../util/platform";

export default StyleSheet.create({
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom()
  },
  tokenContainer: {
    flexDirection: 'row',
    // width: '100%',
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  }
})