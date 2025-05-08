import { useTranslation } from "react-i18next";
import { useBiometric } from "../../hook/useBiometric";
import Button from "../Button";
import Icon from "../Icon";
import { color } from "../../theme/color";
import { TouchableOpacity } from "react-native";
import Text from "../Text";

interface Props {
  onSuccess: () => void;
  onFail: () => void;
}
export default function BiometricAuth({onSuccess, onFail}: Props) {
  const {hasHardware, isEnrolled, authType, trigger} = useBiometric()
  const {t} = useTranslation()

  if (!hasHardware || !isEnrolled) {
    return null
  }

  const handleTrigger = async () => {
    const rs = await trigger()
    if (rs.success) {
      onSuccess()
    } else if (rs.error) {
      onFail()
    }
  }

  return (
    <TouchableOpacity onPress={handleTrigger} style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
      <Icon
        name={'fingerprint'}
        width={24}
        height={24}
        color={color.primary[500]}
      />
      <Text
        style={{color: color.primary[500]}}
      >
        {t('useFingerPrintOrFaceID')}
      </Text>
    </TouchableOpacity>
  )
}