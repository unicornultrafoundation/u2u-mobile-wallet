import { StyleSheet } from "react-native";
import { TABBAR_HEIGHT } from "../../component/CustomBottomTab";
import { getPhonePaddingTop } from "../../util/platform";

export default StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: '#000',
    flex: 1,
    paddingBottom: TABBAR_HEIGHT,
    paddingTop: getPhonePaddingTop()
  },
  stakingDataContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12
  },
  balanceCardContainer: {
    paddingHorizontal: 16
  }
})