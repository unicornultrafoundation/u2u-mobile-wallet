import { ALL_NEWS_ENDPOINT, FEATURED_NEWS_ENDPOINT, NEWS_BY_CATEGORY_ENDPOINT, NEWS_CATEGORY_ENDPOINT } from "../config/constant"

export const fetchNewsCategory = async () => {
  const rs = await fetch(NEWS_CATEGORY_ENDPOINT)
  const rsJSON = await rs.json()
  return rsJSON
}

export const fetchFeaturedNews = async () => {
  const rs = await fetch(FEATURED_NEWS_ENDPOINT)
  const rsJSON = await rs.json()
  return rsJSON
}

export const fetchAllNews = async (page: number, keyword = '') => {
  let url = `${ALL_NEWS_ENDPOINT}?page=${page}`

  if (keyword) {
    url += `&keyword=${keyword}`
  }

  const rs = await fetch(url)
  const rsJSON = await rs.json()
  return rsJSON
}

export const fetchNewsByCategory = async (categoryID: string, page: number) => {
  const rs = await fetch(`${NEWS_BY_CATEGORY_ENDPOINT}${categoryID}?page=${page}`)
  const rsJSON = await rs.json()
  return rsJSON
}

export const fetchNewsDetail = async (newsID: string) => {
  return {}
}
