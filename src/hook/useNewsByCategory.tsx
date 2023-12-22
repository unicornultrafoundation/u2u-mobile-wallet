import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchNewsByCategory } from "../service/news"
import { formatDate } from "../util/date"
import { Article } from "./useNews"

export const useNewsByCategory = (categoryID: string) => {
  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['news-by-category', categoryID],
    queryFn: async ({pageParam = 1}): Promise<Article[]> => {
      try {
        const rs = await fetchNewsByCategory(categoryID, pageParam)
        if (!rs.data) return [] as Article[]
        return rs.data.map((rawNews: any) => {
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
        console.log(error)
        return [] as Article[]
      }
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    news: data,
    isFetching,
    fetchNextPage
  }
}