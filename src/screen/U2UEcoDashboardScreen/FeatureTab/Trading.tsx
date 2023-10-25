import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import Header from '../Header';
import SelectDappModal from '../../../component/SelectDappModal';
import Test from '../../../asset/icon/arrow-right.png';
import DappRow from './DappRow';
import Jazzicon from 'react-native-jazzicon';
import Text from '../../../component/Text';

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
  ];
  return (
    <View>
      <Header text="Trading" />
      <ScrollView>
        {DATA.map((tokenObj: any, index) => {
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
        })}
        {/* <SelectDappModal
          trigger={() => {
            // return <Text>ok</Text>
            // return <Image source={Test} />
            // return <Jazzicon size={28} />;
            return <Button title='ok'>ok</Button>;
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

export default TopDapp;
