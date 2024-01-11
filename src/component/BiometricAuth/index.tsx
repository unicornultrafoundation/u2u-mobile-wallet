import { useTranslation } from "react-i18next";
import { useBiometric } from "../../hook/useBiometric";
import Button from "../Button";

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
    <Button type="text" onPress={handleTrigger}>
      {t('useFingerPrintOrFaceID')}
    </Button>
  )
}