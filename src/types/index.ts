interface BannerListItem {
  imageUrl: string;
}

interface RecommendListItem {
  id: number;
  picUrl: string;
  name: string;
  playCount: number;
}

interface SingerListItem {
  picId: number;
  picUrl: string;
  name: string;
}

export type Tracks = Array<{
  first: string;
  second: string;
}>;

interface RankListItem {
  name: string;
  coverImgUrl: string;
  coverImgId: number;
  updateFrequency: string;
  tracks: Tracks;
  [propName: string]: any;
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
export type SingerList = Array<SingerListItem>;
export type RankList = Array<RankListItem>;
