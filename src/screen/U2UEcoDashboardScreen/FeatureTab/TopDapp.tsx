import React, { useMemo } from 'react';
import {ScrollView, View, Dimensions, ActivityIndicator} from 'react-native';
import Header from '../Header';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRow';
import useFetchDappList from '../../../hook/useFetchDappList';

const TopDapp = () => {
  const {data, loading} = useFetchDappList();

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
      <Header text="Top DApps" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
              key={groupIndex}
              style={{
                width: Dimensions.get('window').width * 0.85,
              }}>
              {group.map((item, index) => (
                <SelectDappModal
                  trigger={() => {
                    return <DappRow dappMeta={item} key={`dapp-${index}`} />;
                  }}
                  title={item.title}
                  description={item.description}
                  logoImg={item.logoImg}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TopDapp;
