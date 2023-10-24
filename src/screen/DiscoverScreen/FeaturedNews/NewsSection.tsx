import { Image, TouchableOpacity, View } from 'react-native';
import TopNews from './TopNews';
import Separator from '../../../component/Separator';
import { useStyles } from '../styles';
import Text from '../../../component/Text';
import { color } from '../../../theme/color';

interface Props {
  news: any[];
}

const NewsSection = ({ news }: Props) => {
  const styles = useStyles();

  return (
    <View>
      <TopNews data={news[0]}/>
      <Separator style={{ borderBottomWidth: 1, marginVertical: 16 }}/>

      <View style={{ gap: 12 }}>
        {news.slice(1, 4).map(item => {
          return (
            <TouchableOpacity key={item.id}>
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
    </View>
  );
};

export default NewsSection;
