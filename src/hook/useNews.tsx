import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchAllNews, fetchNewsByCategory, fetchNewsCategory } from "../service/news";
import { formatDate } from "../util/date";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
  content: string;
}

export const useNews = () => {
  const [keyword, setKeyword] = useState('')
  const debouncedSearchQuery = useDebounce(keyword, 300);

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['all-news', debouncedSearchQuery],
    queryFn: async ({pageParam = 1}) => {
      const rs = await fetchAllNews(pageParam, debouncedSearchQuery)

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
    },
    getNextPageParam: (lastPage, pages) => {
      const nextPageParam = lastPage.length === 0 ? undefined : pages.length + 1
      return nextPageParam
    },
  })

  return {
    news: data,
    isFetching,
    fetchNextPage,
    setKeyword,
    keyword,
    debouncedSearchQuery
  }
}