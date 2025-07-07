import Button from "@/component/Button";
import { usePreference } from "@/hook/usePreference";
import theme from "@/theme";
import { isURL } from "@/util/string";
import { View, Text, Image } from "react-native";

interface AppViewStepProps {
  title: string,
  content: string,
  buttonText: string,
  buttonOnPress: () => void,
  image: string,
  position: string
}

export default function AppViewStep({
  title,
  content,
  buttonText,
  buttonOnPress,
  image,
  position
}: AppViewStepProps) {
  const {preferenceTheme} = usePreference()

  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12}}>
      <View style={{paddingRight: 60, flex: 1}}>
        <Text
          style={[
            theme.typography.caption2.regular,
            {
              color: theme.color.neutral[500],
              marginBottom: 3,
              textAlign: 'left'
            }
          ]}
        >
          {position} {title}
        </Text>
        <Text
          style={[
            theme.typography.body.regular,
            {
              color: preferenceTheme.text.primary,
              marginBottom: 23,
              textAlign: 'left'
            }
          ]}
        >
          {content}
        </Text>
        <Button
          type='text'
          style={{justifyContent: 'flex-start'}}
          onPress={buttonOnPress}
        >
          {buttonText} 
        </Button>
      </View>
      <View>
        <Image
          source={isURL(image) ? {uri: image} : image as any}
          width={117}
          height={94}
          resizeMode="contain"
          style={{
            width: 117,
            height: 94
          }}
        />
      </View>
    </View>
  )
}