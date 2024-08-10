import axios from "axios";
import { IImageData } from "./types";

export function getImgData(userRequest: string, page:number) {
  return axios.get(
    `https://api.unsplash.com/search/photos/
`,
    {
      params: {
        client_id: "_dU7nR9DSxtNejhZ6NiT7yiZISCh5zuBZM31VTBrYcU",
        query: `${userRequest}`,
        orientation: "landscape",
        page: `${page}`,
        per_page: "15",
      },
    }
  );
}

export function mapToImageData(apiResponse: any[]): IImageData[]{
  return apiResponse.map(pic => ({
    id: pic.id,
    src: pic.urls.small,
    regular: pic.urls.regular,
    alt: pic.alt_description,
    likes: pic.likes,
    author: pic.user.first_name,
  }));
}