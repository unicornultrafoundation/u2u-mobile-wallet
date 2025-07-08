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

        return {
          id: rawNews.id,
          title: rawNews.data.title,
          description: rawNews.data.description,
          date: formatDate(new Date(rawNews.last_publication_date), "MMMM dd, yyyy"),
          category: rawNews.data.category.id,
          thumbnail: rawNews.data.featured_image?.url || "",
          content: "",
          slices: rawNews.data.slices
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