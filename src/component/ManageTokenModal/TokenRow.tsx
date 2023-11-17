import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { SvgUri } from 'react-native-svg';
import Text from '../../component/Text';
import { formatNumberString } from '../../util/string';
import theme from '../../theme';
import Icon from '../Icon';
import { useLocalStore } from '../../state/local';

const TokenRow = ({tokenObj}: {
  tokenObj: any
}) => {
  const {selectedToken, toggleToken} = useLocalStore()

  const alreadySelected = useMemo(() => {
    return selectedToken.includes(tokenObj.address)
  }, [selectedToken])

  const handleToggle = () => {
    toggleToken(tokenObj.address)
  }

  return (
    <View style={styles.tokenContainer}>
      <View style={{width: 28, height: 28}}>
        {tokenObj.logo ? (
          <SvgUri
            uri={tokenObj.logo}
            width="100%"
            height="100%"
          />
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
      <TouchableOpacity onPress={handleToggle}>
        {tokenObj.address !== "0x" && tokenObj.address !== "" && (
          <Icon
            name={alreadySelected ? "minus-circle" : "plus-circle"}
            width={24}
            height={24}
            color={alreadySelected ? theme.accentColor.error.normal : theme.accentColor.tertiary.normal}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default TokenRow;