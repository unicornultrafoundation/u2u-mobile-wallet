import React, { useMemo, useState } from 'react';
import {ScrollView, View, Dimensions, ActivityIndicator} from 'react-native';
import Header from '../Header';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRow';
import useFetchDappList from '../../../hook/useFetchDappList';
import { useTranslation } from 'react-i18next';

const SLIDE_WIDTH = Dimensions.get('window').width - 16 * 2

const TopDapp = () => {
  const {data, loading} = useFetchDappList();
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(0)

  const groupData = useMemo(() => {
    const rs: any[][] = [];
    if (data !== null) {
      for (let i = 0; i < data.length; i += 3) {
        rs.push(data.slice(i, i + 3));
      }
    }

    return rs
  }, [data])

  return (
    <View>
      {data && data.length > 0 && <Header text={t('topDApps')} />}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // scrollEventThrottle={100}
        onMomentumScrollEnd={(e) => {
          setSelectedIndex(Math.floor(e.nativeEvent.contentOffset.x / SLIDE_WIDTH))
        }}
      >
        {/* {DATA.map((tokenObj: any, index) => {
          return (
            <SelectDappModal
              trigger={() => {
                return <DappRow tokenObj={tokenObj} key={`dapp-${index}`} />;
              }}
              title={tokenObj.title}
              description={tokenObj.description}
              logoImg={tokenObj.logoImg}
            />
          );
        })} */}
        {loading ? (
          <ActivityIndicator />
        ) : (
          groupData.map((group, groupIndex) => (
            <View
              key={`top-group-${groupIndex}`}
              style={{
                width: Dimensions.get('window').width - 16 * 2,
              }}>
              {group.map((item, index) => (
                <View
                  key={`top-dapp-modal-${item.title}-${index}`}
                >
                  <SelectDappModal
                    trigger={() => {
                      return <DappRow dappMeta={item} key={`dapp-${index}`} />;
                    }}
                    title={item.title}
                    description={item.description}
                    logoImg={item.logoImg}
                  />
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
      <View style={{flexDirection: 'row', gap: 6, justifyContent: 'center'}}>
        {groupData.map((item, index) => {
          return (
            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: index === selectedIndex ? '#FFFFFF' : '#363636'}}></View>
          )
        })}
      </View>
    </View>
  );
};

export default TopDapp;
