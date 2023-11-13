import { StyleSheet } from "react-native";
import { getPhonePaddingBottom } from "../../../util/platform";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: getPhonePaddingBottom()
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 9
  },
})