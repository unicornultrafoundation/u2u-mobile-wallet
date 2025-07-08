import { ALL_NEWS_ENDPOINT, FEATURED_NEWS_ENDPOINT, NEWS_BY_CATEGORY_ENDPOINT, NEWS_CATEGORY_ENDPOINT, NEWS_DETAIL_ENDPOINT, PRISMIC_ACCESS_TOKEN } from "../config/constant"
import * as prismic from "@prismicio/client"
import { filter } from "@prismicio/client";

const client = prismic.createClient("u2u-cms", {
  accessToken: PRISMIC_ACCESS_TOKEN
})

export const fetchNewsCategory = async () => {
  const blogPostCategories = await client.getAllByType("blog_post_categories")
  return blogPostCategories
}

export const fetchFeaturedNews = async () => {
  const news = await client.getByType("blog_post", {
    pageSize: 10,
    page: 1,
    filters: [
      filter.at("my.blog_post.type", "buildingTogether")
    ]
  })

  return {data: news.results}

  // const rs = await fetch(FEATURED_NEWS_ENDPOINT)
  // const rsJSON = await rs.json()
  // return rsJSON
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
  const news = await client.getByType("blog_post", {
    pageSize: 10,
    page: page,
    filters: [
      filter.at("my.blog_post.category", categoryID)
    ]
  })

  return {data: news.results}
  // const rs = await fetch(`${NEWS_BY_CATEGORY_ENDPOINT}${categoryID}?page=${page}`)
  // const rsJSON = await rs.json()
  // return rsJSON
}

export const fetchNewsDetail = async (newsID: string) => {
  const news = await client.getByID(newsID)
  return {data:news}
}
