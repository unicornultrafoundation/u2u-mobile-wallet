import { TouchableOpacity, View } from "react-native"
import { NewsCategory } from "../../hook/useNewsCategory"
import { useTranslation } from "react-i18next"
import Text from '../../component/Text';
import Icon from "../../component/Icon"
import { useStyles } from "./styles"
import { useNewsByCategory } from "../../hook/useNewsByCategory";
import NewsList from "../../component/NewsList";
import { useMemo } from "react";
import { Article } from "../../hook/useNews";
import theme from "../../theme";

const NewsByCategory = ({category, onViewCategory}: {category: NewsCategory, onViewCategory: (categoryID: string) => void}) => {
  const { t } = useTranslation()
  const styles = useStyles();

  const {news} = useNewsByCategory(category.id)
  
  const newsList = useMemo(() => {
    if (!news) return [] as Article[]
    return news.pages.flat()
  }, [news])

  return (
    <View key={category.name}>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <Text style={styles.title} fontSize={16} letterSpacing={0.06}>
          {t(category.name)}
        </Text>

        <TouchableOpacity onPress={() => onViewCategory(category.id)}>
          <Icon
            name="arrow-right"
            width={24}
            height={24}
            color={theme.color.neutral[500]}
          />
        </TouchableOpacity>
      </View>

      <NewsList news={newsList.slice(0, 4)} />
    </View>
  )
}

export default NewsByCategory;
