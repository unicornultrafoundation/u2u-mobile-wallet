import Icon from "@/component/Icon";
import Text from "@/component/Text";
import { usePreference } from "@/hook/usePreference";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./styles";
import { typography } from "@/theme/typography";
import CustomBottomSheetModal from "@/component/CustomBottomSheetModal";
import ModalContent from "./ModalContent";
import { CachedImage } from "@georstat/react-native-image-cache";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export default function TokenSelector({token, onSelect, modalRef}: {
  token?: Record<string, any>;
  onSelect: (token: Record<string, any>) => void;
  modalRef: React.RefObject<BottomSheetModalMethods>;
}) {
  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  return (
    <CustomBottomSheetModal
      modalRef={modalRef}
      title='selectToken'
      trigger={
        <View
          style={[styles.selectTokenContainer, {
            backgroundColor: preferenceTheme.background.surfaceHover
          }]}
        >
          {token && token.address ? (
            <View style={{flexDirection: 'row', gap: 8}}>
              <View style={{width: 24, height: 24}}>
                {token.logo ? (
                  <CachedImage
                    source={token.logo}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                ) : (
                  <Icon
                    name='anonymous-token'
                    width={24}
                    height={24}
                  />
                )}
              </View>
              <Text style={[typography.headline.bold]}>{token.symbol}</Text>
            </View>
          ) : (
            <Text
              style={[typography.headline.medium, {color: preferenceTheme.text.primary}]}
            >
              {t('selectToken')}
            </Text>
          )}
          <Icon
            name="chevron-down"
            color={preferenceTheme.text.primary}
            width={24}
            height={24}
          />
        </View>
      }
      triggerModal={
        <ModalContent
          onSelect={(token) => {
            onSelect(token)
            modalRef?.current?.close()
          }}
        />
      }
      snapPoints={['85%']}
    />
  )
}