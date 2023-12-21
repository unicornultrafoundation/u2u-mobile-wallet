import { useQuery } from "@tanstack/react-query"
import { fetchNewsCategory } from "../service/news";

interface NewsCategory {
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

  return {
    categories: categoryData
  }
}