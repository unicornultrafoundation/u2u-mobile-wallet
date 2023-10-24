import { SafeAreaView, ScrollView, View } from 'react-native';
import { useStyles } from './styles';
import TextInput from '../../component/TextInput';
import React, { useState } from 'react';
import Tab from '../../component/Tab';
import FeaturedNews from "./FeaturedNews";

const DiscoverScreen = () => {
  const styles = useStyles();
  const [queryString, setQueryString] = useState('');
  const [tab, setTab] = useState('featured');
  const tabs = [
    { label: 'Featured', value: 'featured' },
    { label: 'Latest', value: 'latest' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          containerStyle={{ height: 40 }}
          value={queryString}
          onChangeText={text => setQueryString(text)}
        />

        <Tab
          tabs={tabs}
          selectedTab={tab}
          onChange={v => setTab(v)}
          tabStyle={{
            borderColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: 0,
            paddingRight: 12,
          }}
          containerStyle={{
            borderColor: 'transparent',
            marginTop: 8
          }}
        />
        {tab === 'featured' && <FeaturedNews />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
