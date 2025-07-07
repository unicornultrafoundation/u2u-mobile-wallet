import { JSONLINK_API_KEY } from "@/config/constant";

export const fetchHTML = async (url: string) => {
  try {
    const response = await fetch(`https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}&api_key=${JSONLINK_API_KEY}`);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return {title: 'No title', favicon: null, description: null};
  }
};