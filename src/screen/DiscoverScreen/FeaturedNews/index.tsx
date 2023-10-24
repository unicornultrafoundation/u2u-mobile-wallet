import { TouchableOpacity, View } from 'react-native';
import NewsSection from './NewsSection';
import news from '../../../mock/news.json';
import { useStyles } from '../styles';
import Text from '../../../component/Text';
import Icon from '../../../component/Icon';
import { color } from '../../../theme/color';
import { useMemo } from 'react';

const FeaturedNews = () => {
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
      <NewsSection news={featuredNews}/>

      {categories.map(category => {
        return (
          <View key={category.name}>
            <View style={[styles.row, { marginBottom: 16 }]}>
              <Text style={styles.title} fontSize={16} letterSpacing={0.06}>
                {category.name}
              </Text>

              <TouchableOpacity>
                <Icon
                  name="arrow-right"
                  width={24}
                  height={24}
                  color={color.neutral[500]}
                />
              </TouchableOpacity>
            </View>

            <NewsSection news={category.items}/>
          </View>
        );
      })}
    </View>
  );
};

export default FeaturedNews;
