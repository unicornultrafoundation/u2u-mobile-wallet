import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { usePreference } from '../../../hook/usePreference';

const DappRow = ({dappMeta}: {dappMeta: any}) => {
  const {preferenceTheme} = usePreference()

  const navigation = useNavigation<any>();
  const handlePressDetail = () => {
    navigation.navigate('DAppWebView', {url: dappMeta.url});
  };

  const {t} = useTranslation()

  return (
    <View style={styles.tokenContainer}>
      <View style={{width: 40, height: 40}}>
        <Image
          source={{uri: dappMeta.logoImg}}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
        />
      </View>
      <View style={{flex: 1, paddingHorizontal: 8}}>
        <Text style={[theme.typography.label.bold]}>{dappMeta.title}</Text>
        <Text style={[theme.typography.caption1.regular]}>
          {dappMeta.description}
        </Text>
      </View>
      <View>
        <Button
          type="text"
          textStyle={{fontSize: 14, textAlign: 'center', color: preferenceTheme.divider}}
          style={[styles.openButton, {backgroundColor: preferenceTheme.background.surface}]}
          onPress={handlePressDetail}
        >
          {t('open')}
        </Button>
      </View>
    </View>
  );
};

export default DappRow;
