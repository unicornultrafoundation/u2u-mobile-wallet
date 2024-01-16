import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import {useStyles} from './styles';
import TextInput from '../../component/TextInput';
import React, {useCallback, useEffect, useState} from 'react';
import Tab from '../../component/Tab';
import FeaturedNews from './FeaturedNews';
import LatestNews from './LatestNews';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DiscoverStackParamList} from '../../stack/DiscoverStack';
import {useGlobalStore} from '../../state/global';
import {useFocusEffect} from '@react-navigation/native';
import {useDebounce} from '../../hook/useDebounce';
import Icon from '../../component/Icon';
import {useTranslation} from 'react-i18next';
import {color} from '../../theme/color';
import {useNavigation} from '@react-navigation/native';
import { Article, useNews } from '../../hook/useNews';
import { TABBAR_HEIGHT, TABBAR_ITEM_HEIGHT } from '../../component/CustomBottomTab';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'Home'>;

type SearchResult = {
  // id: number;
  title: string;
};

const DiscoverScreen = ({route}: Props) => {
  const styles = useStyles();
  const {setRouteName} = useGlobalStore();
  const [currentCategory, setCurrentCategory] = useState<string>("");
  
  const navigation = useNavigation<any>();

  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Article[]>([]);
  const [searching, setSearching] = useState(false);

  const {t} = useTranslation();

  const [tab, setTab] = useState('featured');

  const {news, fetchNextPage, debouncedSearchQuery, keyword, setKeyword, isFetching} = useNews()
  // const debouncedSearchQuery = useDebounce(keyword, 300);

  const tabs = [
    {label: t('Featured'), value: 'featured'},
    {label: t('Latest'), value: 'latest'},
  ];

  const handleViewCategory = (categoryID: string) => {
    setTab('latest');
    setCurrentCategory(categoryID);
  };

  const handleChangeTab = (t: string) => {
    setTab(t);
    setCurrentCategory("");
  };

  useEffect(() => {
    if (route.params?.defaultTab) {
      setTab(route.params.defaultTab);
    }
  }, [route.params]);

  // const handleSearch = () => {
  //   setResults([])
  //   // Perform the search logic based on the searchQuery
  //   // const filteredResults = news.filter(item =>
  //   //   item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  //   // );
  //   // setResults(filteredResults);
  // };

  useEffect(() => {
    if (debouncedSearchQuery) {
      setSearching(true);
      // handleSearch();
    } else {
      setSearching(false);
      setResults([]);
    }
  }, [debouncedSearchQuery]);

  useFocusEffect(
    useCallback(() => {
      setRouteName(route.name);
    }, [route]),
  );

  const handleViewArticle = (id: number) => {
    navigation.navigate('NewsDetails', {id});
  };

  if (isFetching) {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          containerStyle={{height: 48}}
          placeholder={t('Search articles')}
          placeholderTextColor={'#363636'}
          onChangeText={text => {
            setKeyword(text);
          }}
          value={keyword}
          postIcon={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setKeyword('');
                }}>
                <Icon name="close" width={24} height={24} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {searching ? (
        // Display search results
        <ScrollView contentContainerStyle={{paddingTop: 20, paddingBottom: TABBAR_ITEM_HEIGHT, paddingLeft: 16, paddingRight: 16}}>
          <View style={{gap: 12}}>
            {news && news.pages.flat().map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleViewArticle(item.id)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 12,
                      height: 80,
                      alignItems: 'stretch',
                      marginBottom: 8,
                    }}>
                    <Image
                      source={{uri: item.thumbnail}}
                      style={styles.articleThumbnail}
                    />

                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={[styles.title, {lineHeight: 22}]}>
                        {item.title}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 4,
                          alignItems: 'center',
                        }}>
                        <Text style={styles.caption}>{item.category}</Text>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: color.primary[500],
                            borderRadius: 2,
                          }}
                        />
                        <Text style={styles.caption}>{item.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 120,
            paddingTop: 0,
          }}
          nestedScrollEnabled>
          {/* <TextInput
          containerStyle={{ height: 40 }}
          value={queryString}
          onChangeText={text => setQueryString(text)}
        /> */}

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
            <FeaturedNews onViewCategory={handleViewCategory} />
          )}
          {tab === 'latest' && (
            <LatestNews initialTab={currentCategory} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );

  
};

export default DiscoverScreen;
