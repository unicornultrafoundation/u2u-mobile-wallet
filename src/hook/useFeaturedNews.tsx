import { useQuery } from "@tanstack/react-query"
import { fetchAllNews, fetchFeaturedNews } from "../service/news";
import { Article } from "./useNews";
import { formatDate } from "../util/date";
import { logErrorForMonitoring } from "./useCrashlytics";

export const useFeaturedNews = () => {
  const {data} = useQuery<Article[]>({
    queryKey: ['featured-news'],
    queryFn: async () => {
      try {
        const rs = await fetchFeaturedNews()
        // const rs = await fetchAllNews(1)
        if (!rs.data) return [] as Article[]
        return rs.data.slice(0, 4).map((rawNews: any) => {
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
        })
      } catch (error) {
        logErrorForMonitoring(error as any, 'fetch featured news fail')
        return [] as Article[]
      }
    },
    initialData: [] as Article[]
  })

  return {
    featuredNews: data
  }
}