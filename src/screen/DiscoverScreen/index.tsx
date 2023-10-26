import { SafeAreaView, ScrollView } from 'react-native';
import { useStyles } from './styles';
import TextInput from '../../component/TextInput';
import React, { useEffect, useState } from 'react';
import Tab from '../../component/Tab';
import FeaturedNews from './FeaturedNews';
import LatestNews from './LatestNews';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DiscoverStackParamList } from '../../stack/DiscoverStack';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'Home'>;

const DiscoverScreen = ({ route }: Props) => {
  const styles = useStyles();
  const [queryString, setQueryString] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();

  const [tab, setTab] = useState('featured');
  const tabs = [
    { label: 'Featured', value: 'featured' },
    { label: 'Latest', value: 'latest' },
  ];

  const handleViewCategory = (category: string) => {
    setTab('latest');
    setCurrentCategory(category);
  };

  const handleChangeTab = (t: string) => {
    setTab(t);
    setCurrentCategory(undefined);
  };

  useEffect(() => {
    if (route.params?.defaultTab) {
      setTab(route.params.defaultTab)
    }
  }, [route.params])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }} nestedScrollEnabled>
        <TextInput
          containerStyle={{ height: 40 }}
          value={queryString}
          onChangeText={text => setQueryString(text)}
        />

        <Tab
          tabs={tabs}
          selectedTab={tab}
          onChange={handleChangeTab}
          tabStyle={{
            borderColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: 0,
            paddingRight: 12,
          }}
          containerStyle={{
            borderColor: 'transparent',
            marginTop: 8,
          }}
        />
        {tab === 'featured' && (
          <FeaturedNews onViewCategory={handleViewCategory}/>
        )}
        {tab === 'latest' && <LatestNews initialTab={currentCategory}/>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;