import { TouchableOpacity, View } from 'react-native';
import NewsList from '../../component/NewsList';
import { useStyles } from './styles';
import Text from '../../component/Text';
import Icon from '../../component/Icon';
import { color } from '../../theme/color';
import { useMemo } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Article } from '../../hook/useNews';
import { useNewsCategory } from '../../hook/useNewsCategory';
import NewsByCategory from './NewsByCategory';

interface Props {
  news: Article[]
  onViewCategory: (categoryID: string) => void
}

const FeaturedNews = ({ onViewCategory, news }: Props) => {
  const { t } = useTranslation();

  const styles = useStyles();
  const {categories} = useNewsCategory()

  const featuredNews = news.slice(0, 4);

  return (
    <View style={{ gap: 24 }}>
      <NewsList news={featuredNews} />

      {categories.map(category => {
        return (
          <NewsByCategory category={category} key={category.name} onViewCategory={onViewCategory} />
        );
      })}
    </View>
  );
};

export default FeaturedNews;
