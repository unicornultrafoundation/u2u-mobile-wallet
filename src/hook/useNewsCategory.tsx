import { useQuery } from "@tanstack/react-query"
import { fetchNewsCategory } from "../service/news";
import { useCallback } from "react";

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  parentID: string;
}

export const useNewsCategory = () => {
  const {data: categoryData} = useQuery<NewsCategory[]>({
    queryKey: ['news-category'],
    queryFn: async () => {
      try {
        const newsCateRs = await fetchNewsCategory()
        console.log(newsCateRs)
        return newsCateRs.data.map((i: any) => {
          return {
            id: i.categories_id,
            name: i.categories_name,
            slug: i.categories_slug,
            parentID: i.parent_id || ""
          }
        })
      } catch (error) {
        return []
      }
    },
    initialData: [] as NewsCategory[]
  })

  const findCategory = useCallback((categoryID: string) => {
    const catItem = categoryData.find((i) => i.id === categoryID)
    return catItem
  }, [categoryData])

  return {
    categories: categoryData,
    findCategory
  }
}