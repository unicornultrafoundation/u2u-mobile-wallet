import { useQuery } from "@tanstack/react-query"
import { Article } from "./useNews"
import { fetchNewsDetail } from "../service/news"
import { formatDate } from "../util/date"
import { logErrorForMonitoring } from "./useCrashlytics"

export const useNewsDetail = (id: string) => {
  const {data, isFetching} = useQuery<Article>({
    queryKey: ['news-details', id],
    queryFn: async () => {
      try {
        // const rs = await fetchFeaturedNews()
        const rs = await fetchNewsDetail(id)
        if (!rs.data) return {} as Article
        const rawNews = rs.data
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
      } catch (error) {
        logErrorForMonitoring(error as any, 'fetch news detail fail')
        return {} as Article
      }
    },
  })

  return {
    data,
    isFetching
  }
}