import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";

const NoTransactionView = () => {

  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Image source={require('../../../asset/images/ic_no_transaction.png')} style={styles.image} />
      <Text style={styles.text}> {t('There is no transaction to show')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default NoTransactionView;
