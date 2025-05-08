import { Image, TouchableOpacity, View } from 'react-native';
import TopNews from './TopNews';
import Separator from '../Separator';
import { useStyles } from './styles';
import Text from '../Text';
import { color } from '../../theme/color';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { useNewsCategory } from '../../hook/useNewsCategory';
import { Article } from '../../hook/useNews';

interface Props {
  news: Article[];
  hideTopNews?: boolean;
}

const NewsList = ({ news, hideTopNews = false }: Props) => {
  const styles = useStyles();
  const [topNews, ...rest] = news;
  const navigation = useNavigation<any>();

  const {findCategory} = useNewsCategory()

  const newsList = useMemo(() => {
    return hideTopNews ? news : rest;
  }, [news, rest]);

  const handleViewArticle = (article: Article) => {
    navigation.navigate('NewsDetails', { article });
  };

  return (
    <View>
      {!hideTopNews && (
        <>
          <TopNews
            data={topNews}
            onView={() => handleViewArticle(topNews)}
          />
          <Separator style={{ borderBottomWidth: 1, marginVertical: 16 }}/>
        </>
      )}

      <View style={{ gap: 12 }}>
        {newsList.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleViewArticle(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  height: 110,
                  alignItems: 'stretch',
                }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.articleThumbnail}
                />

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                  <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    style={[styles.title, { lineHeight: 22 }]}>
                    {item.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 4,
                      alignItems: 'center',
                    }}>
                    <Text style={styles.caption}>{findCategory(item.category)?.name}</Text>
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
    </View>
  );
};

export default NewsList;
