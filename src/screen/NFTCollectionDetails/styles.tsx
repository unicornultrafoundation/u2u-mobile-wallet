import { Dimensions, StyleSheet } from "react-native";
import { getPhonePaddingBottom, getPhonePaddingTop } from "../../util/platform";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    paddingTop: getPhonePaddingTop(),
    paddingBottom: getPhonePaddingBottom()
  },
  section: {
    paddingHorizontal: 16
  },
  banner: {
    position: 'relative'
  },
  bannerContent: {

  },
  bannerAvatar: {

  }
})