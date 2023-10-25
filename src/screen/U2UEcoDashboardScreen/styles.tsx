import { StyleSheet } from "react-native";
import { TABBAR_HEIGHT } from "../../component/CustomBottomTab";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: '#000',
    flex: 1,
    paddingBottom: TABBAR_HEIGHT
  },
  input: {
    height: 40,  // You can adjust the height as needed
    borderColor: '#000',  // You can adjust the color as needed
    borderWidth: 1,
    borderRadius: 10, // Rounded border
    paddingLeft: 15,  // Left padding
    color: '#000',    // Text color
    fontSize: 16,     // Font size
    backgroundColor: '#1F2225', // Background color
  },
})