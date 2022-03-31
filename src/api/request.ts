import {axiosInstance} from "./config";
import {BannerList, RecommendList} from "@/types";
import {GetKeyType} from "@/utils/";


interface ResponseTypes {
  "/banner": {
    banners: BannerList
  };
  "/personalized": {
    result: RecommendList
  };
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
