import { axiosInstance } from "./config";
import {
  BannerList,
  RecommendList,
  SingerList,
  RankList,
  AlbumType,
  SingerType,
  Lyric
} from "@/types";
import { GetKeyType, categoryMap } from "@/utils";

interface ResponseTypes {
  "/banner": {
    banners: BannerList;
  };
  "/personalized": {
    result: RecommendList;
  };
  "/top/artists": {
    artists: SingerList;
  };
  "/artist/list": {
    artists: SingerList;
  };
  "/toplist/detail": {
    list: RankList;
  };
  "/playlist/detail": {
    playlist: AlbumType;
  };
  "/artists": SingerType;
  "/lyric": Lyric;
  [key: string]: unknown;
}

export const getBannerRequest = () => {
  const url = "/banner";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(url);
};

export const getRecommendListRequest = () => {
  const url = "/personalized";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(url);
};

export const getHotSingerListRequest = (count: number) => {
  const url = "/top/artists";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(
    `${url}?offset=${count}`
  );
};

export const getSingerListRequest = (
  category: string,
  alpha: string,
  count: number
) => {
  const url = "/artist/list";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(
    `${url}?type=${categoryMap.get(category)?.type}&area=${
      categoryMap.get(category)?.area
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

export const getRankListRequest = () => {
  const url = "/toplist/detail";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(url);
};

export const getAlbumDetailRequest = (id: string) => {
  const url = "/playlist/detail";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(
    `${url}?id=${id}`
  );
};

export const getSingerInfoRequest = (id: string) => {
  const url = "/artists";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(
    `${url}?id=${id}`
  );
};

export const getLyricRequest = (id: number) => {
  const url = "/lyric";
  return axiosInstance.get<GetKeyType<typeof url, ResponseTypes>>(
    `/lyric?id=${id}`
  );
};
