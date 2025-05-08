import { StyleSheet } from "react-native";
import { getPhonePaddingTop } from "../../util/platform";
import { TABBAR_HEIGHT } from "../../component/CustomBottomTab";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getPhonePaddingTop(),
    // paddingBottom: TABBAR_HEIGHT
  },
});