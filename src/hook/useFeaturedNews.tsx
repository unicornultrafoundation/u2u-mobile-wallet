import { useQuery } from "@tanstack/react-query"
import { fetchFeaturedNews } from "../service/news";
import { Article } from "./useNews";

export const useFeaturedNews = () => {
  const {data} = useQuery<Article[]>({
    queryKey: ['featured-news'],
    queryFn: async () => {
      try {
        const rs = await fetchFeaturedNews()
        if (!rs.data) return [] as Article[]
        return rs.data.map((rawNews: any) => {
          // const dateUnixNumber = Number(rawNews.create_at)
          return {
            id: rawNews.event_id,
            title: rawNews.event_title,
            description: rawNews.event_desc,
            date: "",
            category: "",
            thumbnail: "",
            content: ""
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