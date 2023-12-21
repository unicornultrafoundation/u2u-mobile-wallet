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

interface Props {
  news: Article[]
  onViewCategory: (categoryName: string) => void
}

const FeaturedNews = ({ onViewCategory, news }: Props) => {
  const { t } = useTranslation();

  const styles = useStyles();
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

  const featuredNews = news.slice(0, 4);

  return (
    <View style={{ gap: 24 }}>
      <NewsList news={featuredNews} />

      {categories.map(category => {
        return (
          <View key={category.name}>
            <View style={[styles.row, { marginBottom: 16 }]}>
              <Text style={styles.title} fontSize={16} letterSpacing={0.06}>
                {t(category.name)}
              </Text>

              <TouchableOpacity onPress={() => onViewCategory(category.name)}>
                <Icon
                  name="arrow-right"
                  width={24}
                  height={24}
                  color={color.neutral[500]}
                />
              </TouchableOpacity>
            </View>

            <NewsList news={category.items.slice(0, 4)} />
          </View>
        );
      })}
    </View>
  );
};

export default FeaturedNews;
