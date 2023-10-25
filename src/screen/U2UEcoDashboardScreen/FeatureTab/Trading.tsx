import React from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import Header from '../Header';
import SelectDappModal from '../../../component/SelectDappModal';
import DappRow from './DappRow';

const TopDapp = () => {
  const DATA = [
    {
      title: 'Ultra X',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 Swap',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 OTC',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
    {
      title: 'U2 OTCAA',
      description: 'Description',
      logoImg: 'https://fakeimg.pl/300/',
    },
  ];
  const groupData: any[][] = [];
  for (let i = 0; i < DATA.length; i += 3) {
    groupData.push(DATA.slice(i, i + 3));
  }
  return (
    <View>
      <Header text="Trading" />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {groupData.map((group, groupIndex) => (
          <View
            key={groupIndex}
            style={{
              width: Dimensions.get('window').width * 0.85,
            }}>
            {group.map((item, index) => (
              <SelectDappModal
                trigger={() => {
                  return <DappRow tokenObj={item} key={`dapp-${index}`} />;
                }}
                title={item.title}
                description={item.description}
                logoImg={item.logoImg}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDapp;
