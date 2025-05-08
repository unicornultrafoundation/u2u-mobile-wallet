import { Image, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import Text from '../Text';
import { color } from '../../theme/color';
import { useNewsCategory } from '../../hook/useNewsCategory';

interface Props {
  data: any;
  onView: () => void
}

const TopNews = ({ data, onView }: Props) => {
  const styles = useStyles();
  const {findCategory} = useNewsCategory()

  if (!data) {
    return null
  }

  return (
    <TouchableOpacity onPress={onView}>
      <View style={{ gap: 8 }}>
        <Image
          resizeMode="cover"
          style={styles.topNewsImage}
          source={{ uri: data.thumbnail }}
        />

        <Text style={[styles.title, { lineHeight: 25 }]} fontSize={20}>
          {data.title}
        </Text>

        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>{data.description}</Text>

        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Text style={styles.caption}>{findCategory(data.category)?.name}</Text>
          <View
            style={{
              width: 4,
              height: 4,
              backgroundColor: color.primary[500],
              borderRadius: 2,
            }}
          />
          <Text style={styles.caption}>{data.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TopNews;
