import { useQuery } from "@tanstack/react-query"
import { fetchNewsCategory } from "../service/news";
import { useCallback } from "react";
import { logErrorForMonitoring } from "./useCrashlytics";

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
        return newsCateRs.map((i: any) => {
          return {
            id: i.id,
            name: i.data.name,
            slug: i.slugs[0],
            // parentID: i.parent_id || ""
            parentID: ""
          }
        })
      } catch (error) {
        logErrorForMonitoring(error as any, "get news category fail")
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