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
import { Wallet, isHexString } from 'ethers';
import { usePreference } from '../../hook/usePreference';
import { hexToString } from '../../util/string';
import { useTransaction } from '../../hook/useTransaction';
import SelectNetworkModal from '../../component/SelectNetworkModal';
import TextInput from '../../component/TextInput';

const myResource = require('./mobile-provider.jsstring');
const SCALE_FOR_DESKTOP = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

const DAppWebView = () => {

  const { setRouteName } = useGlobalStore();
  const {preferenceTheme} = usePreference()
  const navigation = useNavigation()
  const route = useRoute<any>();
  const {resetTxState} = useTransaction()

  const appURL = route.params?.url || ""
  // const appURL = 'http://192.168.1.38:3000'
  const [url, setURL] = useState(appURL.replace('{{slash}}', '/'))
  const [inputURL, setInputURL] = useState(url)

  const [resource, setResource] = useState('')
  const [loading, setLoading] = useState(true)
  const [requestIdForCallback, setRequestIdForCallback] = useState(0)
  const [txObj, setTxObj] = useState<Record<string, any>>({})
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [loadingURL, setLoadingURL] = useState(false)
  const [alreadyInited, setAlreadyInited] = useState(false)
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

  useEffect(() => {
    console.log('url change', url)
    setInputURL(url)
  }, [url])

  const handleConfirmTx = (txHash: string) => {
    const codeToRun = parseRun(requestIdForCallback, txHash)
    if (webRef && webRef.current) {
      webRef.current.injectJavaScript(codeToRun);
    }
    resetTxState()
  }

  const handleRejectTx = () => {
    const codeToRun = parseError(requestIdForCallback, 'Transacion rejected')
    if (webRef && webRef.current) {
      webRef.current.injectJavaScript(codeToRun);
    }
    resetTxState()
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
        const rawMessage = isHexString(params.data) ? hexToString(params.data.replace("0x", "")) : params.data
        const signature = await signer.signMessage(rawMessage);

        const rs = parseRun(requestId, signature)
        if (webRef && webRef.current) {
          webRef.current.injectJavaScript(rs);
        }
        break;
      case 'requestAccounts':
        const codeToRun = parseRun(requestId, [wallet.address])
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
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16}}>
        <TouchableOpacity
          onPress={() => webRef.current.goBack()}
        >
          <Icon
            style={{paddingRight: 0}}
            width={24}
            height={24}
            name="arrow-left"
            color="#8D8D8D"
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextInput value={inputURL} onChangeText={setInputURL} blurOnSubmit onSubmitEditing={() => setURL(inputURL)} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 8}}>
          <SelectNetworkModal
            trigger={() => {
              return (
                <View style={[styles.networkContainer, { backgroundColor: preferenceTheme.background.surface }]}>
                  <Text style={styles.networkText}>{networkConfig?.name}</Text>
                  <Icon name="chevron-down" width={10} height={10}/>
                </View>
              )
            }}
          />
          <TouchableOpacity
            onPress={() => webRef.current.reload()}
          >
            <Icon
              style={{paddingRight: 0}}
              width={24}
              height={24}
              name="reload"
            />
          </TouchableOpacity>
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
          // injectedJavaScript={ Platform.OS === 'android' ? historyAPIShim : '' }
          onMessage={onMessage}
          onNavigationStateChange={(nativeEvent) => {
            // if (Platform.OS === 'ios') {
            //   return
            // }
            if (nativeEvent.url !== inputURL) {
              setInputURL(nativeEvent.url)
              // webRef.current.reload()
            }
          }}
          onLoadStart={() => !alreadyInited && setLoadingURL(true)}
          onLoadEnd={() => {
            setLoadingURL(false)
            if (!alreadyInited) {
              setAlreadyInited(true)
            }
          }}
          source={{ uri: url }}
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
        onReject={() => {
          handleRejectTx()
          setConfirmModalVisible(false)
        }}
      />
    </View>
  )
}

export default DAppWebView;
