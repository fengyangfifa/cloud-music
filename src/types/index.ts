interface BannerListItem {
  imageUrl: string;
}

interface RecommendListItem {
  id: string;
  picUrl: string;
  name: string;
  playCount: number;
}

interface SingerListItem {
  picId: number;
  picUrl: string;
  name: string;
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
export type SingerList = Array<SingerListItem>;
