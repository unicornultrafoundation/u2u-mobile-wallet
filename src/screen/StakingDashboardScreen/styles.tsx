import { StyleSheet } from "react-native";
import { TABBAR_HEIGHT } from "../../component/CustomBottomTab";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: '#000',
    flex: 1,
    paddingBottom: TABBAR_HEIGHT
  }
})