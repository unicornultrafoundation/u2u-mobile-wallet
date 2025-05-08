import { View, ActivityIndicator } from "react-native";

const LoadingView = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  )
}

export default LoadingView;
