export const handleGoBack = (navigation: any) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.navigate('WalletStack', {screen: 'Wallet'})
  }
}