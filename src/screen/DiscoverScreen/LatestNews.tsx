import { ScrollView, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tab from '../../component/Tab';
import NewsList from '../../component/NewsList';
import { useNewsCategory } from '../../hook/useNewsCategory';
import { Article } from '../../hook/useNews';
import { useNewsByCategory } from '../../hook/useNewsByCategory';

interface Props {
  initialTab?: string
}

const LatestNews = ({ initialTab }: Props) => {
  const scrollView = useRef<ScrollView>(null)

  const {categories} = useNewsCategory()

  const [tab, setTab] = useState(categories[0].name);
  const tabs = useMemo(() => {
    return categories.map(c => ({ label: c.name, value: c.name }));
  }, [categories]);

  const {news} = useNewsByCategory(categories.find((i) => i.name === tab)?.id || "")

  const newsByCategory = useMemo(() => {
    if (!news) return [] as Article[]
    return news.pages.flat()
  }, [news])

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab)
    }
  }, [initialTab])

  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        contentContainerStyle={{ marginBottom: 16 }}
        ref={scrollView}
      >
        <Tab
          tabs={tabs}
          selectedTab={tab}
          onChange={v => setTab(v)}
          containerStyle={{
            columnGap: 16,
          }}
          tabStyle={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingHorizontal: 0,
          }}
          scrollTo={scrollView?.current?.scrollTo}
        />
      </ScrollView>
      <NewsList news={newsByCategory} />
    </View>
  );
};

export default LatestNews;
