import { useQuery } from "@tanstack/react-query"
import { fetchAllNews, fetchFeaturedNews } from "../service/news";
import { Article } from "./useNews";
import { formatDate } from "../util/date";

export const useFeaturedNews = () => {
  const {data} = useQuery<Article[]>({
    queryKey: ['featured-news'],
    queryFn: async () => {
      try {
        // const rs = await fetchFeaturedNews()
        const rs = await fetchAllNews(1)
        if (!rs.data) return [] as Article[]
        return rs.data.slice(0, 4).map((rawNews: any) => {
          const dateUnixNumber = Number(rawNews.create_at)
          return {
            id: rawNews.news_id,
            title: rawNews.news_title,
            description: rawNews.meta_desc,
            date: formatDate(new Date(dateUnixNumber * 1000), "MMMM dd, yyyy"),
            category: rawNews.news_categories,
            thumbnail: rawNews.news_avatar,
            content: rawNews.news_description
          }
        })
      } catch (error) {
        return [] as Article[]
      }
    },
    initialData: [] as Article[]
  })

  return {
    featuredNews: data
  }
}