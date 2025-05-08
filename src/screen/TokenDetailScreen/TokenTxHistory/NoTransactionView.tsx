import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import theme from '../../../theme';
import { usePreference } from '../../../hook/usePreference';

const NoTransactionView = () => {

  const {t} = useTranslation()
  const {preferenceTheme} = usePreference()

  return (
    <View style={styles.container}>
      <Image source={require('../../../asset/images/ic_no_transaction.png')} style={styles.image} />
      <Text style={[
        theme.typography.body.regular,
        {
          color: preferenceTheme.text.disabled,
        }
      ]}> {t('There is no transaction to show')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 60,
    marginHorizontal: 16,
  },
  image: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    marginBottom: 16,
  },
});

export default NoTransactionView;
