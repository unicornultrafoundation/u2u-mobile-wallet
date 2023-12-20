import Text from '../../../component/Text';
import { TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import Icon from "../../../component/Icon";
import { OwnedNFT } from '../../../hook/useOwnedNFT';
import { NFTCollectionMeta } from '../../../hook/useSupportedNFT';
import { shortenAddress } from '../../../util/string';
import { useNetwork } from '../../../hook/useNetwork';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const NFTBasicInfo = ({item, nftCollection}: {
  item: OwnedNFT;
  nftCollection: NFTCollectionMeta
}) => {
  const {networkConfig} = useNetwork()
  const { t } = useTranslation();
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  
  const renderItem = ({label, value, flex = 1} : {
    label: string,
    value: string,
    flex?: number
  }) => {
    return (
      <View style={{flex: flex}}>
        <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, marginBottom: 8}]}>
          {t(label)}
        </Text>
        <Text style={[theme.typography.caption1.medium, {color: preferenceTheme.text.title}]}>
          {value}
        </Text>
      </View>
    )
  }

  const renderCopyItem = ({label, displayValue, value, flex = 1} : {
    label: string,
    displayValue: string,
    value?: string,
    flex?: number
  }) => {
    return (
      <View style={{flex: flex}}>
        <Text style={[theme.typography.caption2.regular, {color: preferenceTheme.text.secondary, marginBottom: 8}]}>
          {t(label)}
        </Text>
        { 
        !value 
          ? <Text style={theme.typography.caption1.medium}>{displayValue}</Text> 
          : <TouchableOpacity onPress={() => {
            if (value == null) return
            Clipboard.setString(value)
            Toast.show({
              type: "simpleNoti",
              text1: t("msgCopied"),
              props: {
                width: '45%'
              }
            })
          }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[
                theme.typography.caption1.medium, 
                {paddingRight: 5, flexShrink: 1}
              ]}>
                {displayValue}
              </Text>
              <Icon name='copy' width={16} height={16} color={preferenceTheme.text.disabled}/>
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }

  return (
    <View>
      <Text
        style={[
          theme.typography.label.bold,
          {color: preferenceTheme.text.title}
        ]}>
        {t('basicInformation')}
      </Text>

      <View style={styles.txRowContainer}>
        {renderCopyItem({
          label: 'contractAddress', 
          displayValue: shortenAddress(nftCollection.id, 8, 8), 
          value: nftCollection.id, 
          flex: 2,
        })}
        {renderItem({label: 'tokenID', value: item.tokenID})}
      </View>
      <View style={styles.txRowContainer}>
        {renderItem({label: 'blockchain', value: networkConfig?.name ?? '--', flex: 2})}
        {renderItem({label: 'tokenStandard', value: 'URC-721'})}
      </View>
      {/* <View style={styles.txRowContainer}>
        {renderItem({label: 'time', value: 'dd/MM/yyyy, HH:mm:ss'})}
      </View> */}
    </View>
  );
};

export default NFTBasicInfo;
