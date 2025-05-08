import { View } from 'react-native';
import { styles } from './styles';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { OwnedNFT } from '../../hook/useOwnedNFT';
import { NFTCollectionMeta } from '../../hook/useSupportedNFT';
import { useNFTHistory } from '../../hook/useNFTHistory';
import { formatDate } from '../../util/date';
import { shortenAddress } from '../../util/string';
import { ZeroAddress } from 'ethers';

const NFTHistory = ({item, nftCollection}: {item: OwnedNFT, nftCollection: NFTCollectionMeta;}) => {
  const { darkMode } = usePreferenceStore();
  const { t } = useTranslation();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {history} = useNFTHistory(item, nftCollection)

  const renderAddress = (label: string, address: string) => {
    return (
      <Text style={[
        theme.typography.caption2.regular,
        {color: preferenceTheme.text.disabled, textAlign: 'right'}
      ]}>
        {t(label)}{' '}
        <Text style={{color: preferenceTheme.text.title, textAlign: 'right'}}>{shortenAddress(address, 6, 6)}</Text>
      </Text>
    )
  }

  return (
    <View>
      {history.map((item, index) =>  {
        const type = item.from.id === ZeroAddress ? "Mint" : (item.to.id === ZeroAddress ? "Burn" : "Transfer")
        return (
          <View 
            style={styles.txHistoryContainer} 
            key={index}
          >
            <Icon
              name={type === 'Transfer' ? 'transfer' : (type === 'Burn' ? 'burn' : 'mint')}
              width={20}
              height={20}
            />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text style={[ 
                theme.typography.caption1.medium,
                {color: preferenceTheme.text.primary}
              ]}>
                {type}
              </Text>
              <Text style={[
                theme.typography.caption2.regular,
                {color: preferenceTheme.text.disabled}
              ]}>
                {formatDate(new Date(Number(item.transferAt) * 1000), "MMMM dd, yyyy")}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', gap: 2}}>
              {renderAddress('from', item.from.id)}
              {renderAddress('to', item.to.id)}
            </View>
          </View>
        )
      })}
    </View>
  );
};

export default NFTHistory;
