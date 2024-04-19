import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';
import theme from '../../theme';
import Icon from '../Icon';
import { useLocalStore } from '../../state/local';
import { CachedImage } from '@georstat/react-native-image-cache';

const TokenRow = ({tokenObj, onSelect}: {
  tokenObj: any;
  onSelect: (tokenObj: any) => void;
}) => {
  const {selectedToken, toggleToken} = useLocalStore()

  const alreadySelected = useMemo(() => {
    return selectedToken.includes(tokenObj.address)
  }, [selectedToken])

  const handleToggle = () => {
    onSelect(tokenObj)
  }

  const renderTokenLogo = (uri: string) => {
    if (uri.endsWith(".png")) {
      return (
        <CachedImage
          source={uri}
          style={{ width: 28, height: 28, borderRadius: 14 }}
          thumbnailSource="https://via.placeholder.com/28x28"
        />
      )
    } else {
      return (
        <SvgUri
          uri={tokenObj.logoURI}
          width="100%"
          height="100%"
        />
      )
    }
  }

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.tokenContainer}>
      <View style={{width: 28, height: 28, backgroundColor: 'transparent'}}>
        {tokenObj.logoURI ? (
          renderTokenLogo(tokenObj.logoURI)
        ) : (
          <Icon
            name='anonymous-token'
          />
        )}
      </View>
      <View style={{ flex: 1, paddingHorizontal: 8}}>
        <Text style={[theme.typography.caption1.medium]}>{tokenObj.symbol}</Text>
        <Text style={[theme.typography.caption1.regular]}>{tokenObj.name}</Text>
      </View>
      {/* <TouchableOpacity onPress={handleToggle}>
        {tokenObj.address !== "0x" && tokenObj.address !== "" && (
          <Icon
            name={alreadySelected ? "minus-circle" : "plus-circle"}
            width={24}
            height={24}
            color={alreadySelected ? theme.accentColor.error.normal : theme.accentColor.tertiary.normal}
          />
        )}
      </TouchableOpacity> */}
    </TouchableOpacity>
  )
}

export default TokenRow;