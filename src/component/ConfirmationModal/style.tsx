import { StyleSheet } from "react-native";
import { getPhonePaddingTop, getPhonePaddingBottom } from "../../util/platform";

export default StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom()
  },
  contentContainer: {
    width: 280,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
    borderRadius: 16,
    shadowRadius: 6,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
  },
})
