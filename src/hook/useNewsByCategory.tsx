import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchNewsByCategory } from "../service/news"
import { formatDate } from "../util/date"
import { Article } from "./useNews"
import { logErrorForMonitoring } from "./useCrashlytics"

export const useNewsByCategory = (categoryID: string) => {
  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['news-by-category', categoryID],
    queryFn: async ({pageParam = 1}): Promise<Article[]> => {
      try {
        if (!categoryID) return [] as Article[]
        const rs = await fetchNewsByCategory(categoryID, pageParam)
        if (!rs.data) return [] as Article[]
        return rs.data.map((rawNews: any) => {
          // const dateUnixNumber = Number(rawNews.create_at)
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
        logErrorForMonitoring(error as any, "get news by category fail")
        return [] as Article[]
      }
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
    initialPageParam: 1
  })

  return {
    news: data,
    isFetching,
    fetchNextPage
  }
}