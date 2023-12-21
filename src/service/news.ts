import { ALL_NEWS_ENDPOINT, NEWS_CATEGORY_ENDPOINT } from "../config/constant"

export const fetchNewsCategory = async () => {
  const rs = await fetch(NEWS_CATEGORY_ENDPOINT)
  const rsJSON = await rs.json()
  return rsJSON
}

export const fetchAllNews = async (page: number) => {
  const rs = await fetch(`${ALL_NEWS_ENDPOINT}?page=${page}`)
  const rsJSON = await rs.json()
  return rsJSON
}
