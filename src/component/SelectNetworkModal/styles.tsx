import { StyleSheet } from "react-native";
import { getPhonePaddingBottom } from "../../util/platform";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom()
  },
})