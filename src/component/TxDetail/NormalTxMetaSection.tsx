import React from 'react'
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import Text from '../Text';
import theme from '../../theme';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

const NormalTxMetaSection = ({txValue}: {
  txValue: string
}) => {
  const {darkMode} = usePreferenceStore()
  const preferenceTheme = darkMode ? darkTheme : lightTheme

  return (
    <View style={{flexDirection: 'row', padding: 16, alignItems: 'center'}}>
      <View style={{width: 32, height: 32}}>
        <SvgUri
          uri={"https://raw.githubusercontent.com/phongnhat19/explorer-assets/master/public_assets/token_logos/u2u.svg"}
          width="100%"
          height="100%"
        />
      </View>
      <Text
          style={[
            theme.typography.title3.medium,
            {
              marginLeft: 6,
              color: preferenceTheme.text.title
            }
          ]}
      >
        -{' '}{txValue} U2U
      </Text>
    </View>
  )
}

export default NormalTxMetaSection;
