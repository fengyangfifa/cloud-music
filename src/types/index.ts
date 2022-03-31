interface BannerListItem {
  imageUrl: string
}

interface RecommendListItem {
  id: string,
  picUrl: string,
  name: string,
  playCount: number
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
