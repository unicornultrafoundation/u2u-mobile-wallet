import { ScrollView, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import news from '../../mock/news.json';
import Tab from '../../component/Tab';
import NewsList from '../../component/NewsList';

interface Props {
  initialTab?: string
}

const LatestNews = ({ initialTab }: Props) => {
  const scrollView = useRef<ScrollView>(null)

  const categories = useMemo(() => {
    return news.reduce((a, b) => {
      const categoryIndex = a.findIndex(item => item.name === b.category);
      if (categoryIndex < 0) {
        a.push({
          name: b.category,
          items: [b],
        });
        return a;
      }
      a[categoryIndex].items.push(b);
      return a;
    }, [] as any[]);
  }, [news]);

  const [tab, setTab] = useState(categories[0].name);
  const tabs = useMemo(() => {
    return categories.map(c => ({ label: c.name, value: c.name }));
  }, [categories]);

  const newsByCategory = useMemo(() => {
    const category = categories.find(c => c.name === tab);
    if (!category) {
      return [];
    }
    return category.items;
  }, [tab, categories]);

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab)
    }
  }, [initialTab])

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={{ marginBottom: 16 }} ref={scrollView}>
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
