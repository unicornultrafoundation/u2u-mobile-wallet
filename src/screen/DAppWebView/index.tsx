import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, BackHandler, Platform, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { WebView } from 'react-native-webview';
import { useWallet } from '../../hook/useWallet';
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useNetwork } from '../../hook/useNetwork';
import loadLocalResource from 'react-native-local-resource';
import { parseError, parseRun } from '../../util/dapp';
import Icon from '../../component/Icon';
import Text from '../../component/Text';
import ConfirmTxModal from './ConfirmTxModal';
import { useGlobalStore } from '../../state/global';
import { Wallet } from 'ethers';
import { usePreference } from '../../hook/usePreference';

const myResource = require('./mobile-provider.jsstring');
const SCALE_FOR_DESKTOP = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

const DAppWebView = () => {

  const { setRouteName } = useGlobalStore();
  const {preferenceTheme} = usePreference()
  const navigation = useNavigation()
  const route = useRoute<any>();

  const appURL = route.params?.url || ""
  const [resource, setResource] = useState('')
  const [loading, setLoading] = useState(true)
  const [requestIdForCallback, setRequestIdForCallback] = useState(0)
  const [txObj, setTxObj] = useState<Record<string, any>>({})
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [loadingURL, setLoadingURL] = useState(false)
  const [error, setError] = useState('')

  const webRef = useRef<any>()
  const {wallet} = useWallet()
  const {networkConfig} = useNetwork()

  const isFocused = useIsFocused()

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const registerBackHandlerAndroid = () => {
    const onBackPress = () => {
      if (isFocused) {
        if (!webRef || !webRef.current) return false
        webRef.current.goBack();
        return true;
      } else {
        return false;
      }
    };
    
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }

  const registerBackHandlerIOS = () => {
    const gestureEndListener = () => {
      if (isFocused) {
        if (!webRef || !webRef.current) return false
        webRef.current.goBack();
        return true;
      } else {
        return false;
      }
    };
  
    // You can also use the 'gestureStart' or 'gestureCancel' events
    // @ts-ignore
    navigation.addListener('gestureEnd', gestureEndListener);
  
    return () => {
      // @ts-ignore
      navigation.removeListener('gestureEnd', gestureEndListener);
    };
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      registerBackHandlerAndroid()
    } else if (Platform.OS === 'ios') {
      registerBackHandlerIOS()
    }
    
  }, [isFocused, webRef])

  useEffect(() => {
    setLoading(true)
    loadLocalResource(myResource)
      .then((myResourceContent: any) => {
        setResource(
          myResourceContent
            .replace('{{RPC_URL}}', networkConfig?.rpc)
            .replace('{{WALLET_ADDRESS}}', wallet.address)
            .replace('{{CHAIN_ID}}', networkConfig?.chainID)
        )
        setLoading(false)
      }
    )
  }, [wallet, networkConfig])

  const handleConfirmTx = (txHash: string) => {
    const codeToRun = parseRun(requestIdForCallback, txHash)
    if (webRef && webRef.current) {
      webRef.current.injectJavaScript(codeToRun);
    }
  }

  const handleRejectTx = () => {
    const codeToRun = parseError(requestIdForCallback, 'Transacion rejected')
    if (webRef && webRef.current) {
      webRef.current.injectJavaScript(codeToRun);
    }
  }

  const handleLog = (logData: any) => {
    if (logData.type === 'error') {
      console.log('Error from frame', logData.data)
    } else if (logData.type === 'log') {
      console.log('Log from frame', logData.data)
    }
  }

  const handleRPC = async (requestId: number, method: string, params: Record<string, any>) => {
    if (!method) return
    switch (method) {
      case 'signPersonalMessage':
        if (!wallet.privateKey) return;

        const signer = new Wallet(wallet.privateKey)
        const signature = await signer.signMessage(params.data);

        const rs = parseRun(requestId, signature)
        if (webRef && webRef.current) {
          webRef.current.injectJavaScript(rs);
        }
        break;
      case 'requestAccounts':
        const codeToRun = parseRun(requestId, [wallet.address])
        console.log(codeToRun)
        if (webRef && webRef.current) {
          webRef.current.injectJavaScript(codeToRun);
        }
        break;
      case 'eth_sendTransaction':
      case 'signTransaction':
        setTxObj(JSON.parse(JSON.stringify(params)))
        setConfirmModalVisible(true);
        break;
      default:
        throw `Invalid method name ${method}`
    }
  }

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data)
    if (data.type && ['debug', 'info', 'warn', 'error', 'log'].includes(data.type)) {
      handleLog(data)
    } else {
      const requestId = data.id
      const method = data.name
      const params = data.object
      let codeToRun = ''

      try {
        if (requestId) {
          setRequestIdForCallback(requestId)
        }
        handleRPC(requestId, method, params)
      } catch (error) {
        codeToRun = parseError(requestId, error)
        if (webRef && webRef.current) {
          webRef.current.injectJavaScript(codeToRun);
        }
      }
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: preferenceTheme.background.background
        }
      ]}
    >
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', padding: 16}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            style={{paddingRight: 0}}
            width={24}
            height={24}
            name="close"
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <WebView
          // cacheEnabled={shouldUseCache}
          ref={webRef}
          // userAgent={
          //   viewMode === 'DESKTOP' ?
          //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2564.109 Safari/537.36"
          //   : undefined
          // }
          scalesPageToFit={true}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={false}
          injectedJavaScriptBeforeContentLoaded={ resource }
          // injectedJavaScript={ viewMode === 'DESKTOP' ? SCALE_FOR_DESKTOP : '' }
          onMessage={onMessage}
          onLoadStart={() => setLoadingURL(true)}
          onLoadEnd={() => setLoadingURL(false)}
          source={{ uri: appURL }}
          style={styles.webview}
          containerStyle={{
            flex: loadingURL || error !== '' ? 0 : 1,
          }}
          renderError={(errorName) => {
            if (!errorName) return <Text>{''}</Text>;
            setError(errorName)
            return (
              <View style={{backgroundColor: '#FFFFFF', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text 
                  style={{
                    fontSize: 30,
                    marginBottom: 30,
                    fontWeight: '500',
                    fontFamily: Platform.OS === 'android' ? 'WorkSans-SemiBold' : undefined
                  }}
                >
                  Error loading your DApp
                </Text>
                <Text>Error code: {errorName}</Text>
              </View>
            )
          }}
        /> 
      </View>
      <ConfirmTxModal
        showModal={confirmModalVisible}
        txObj={txObj}
        onCloseModal={() => {
          setConfirmModalVisible(false)
          handleRejectTx()
        }}
        onConfirm={(txHash: string) => {
          handleConfirmTx(txHash)
          setConfirmModalVisible(false)
        }}
      />
    </View>
  )
}

export default DAppWebView;
