import appsFlyer from 'react-native-appsflyer'

export const getAppFlyerUserID = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    appsFlyer.getAppsFlyerUID((err, uid) => {
      if (err) {
        reject(err)
      } else {
        resolve(uid)
      }
    })
  })
}

export const logEventAppFlyer = async (eventName: string, eventValues: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    appsFlyer.logEvent(eventName, eventValues, resolve, reject)
  })
}