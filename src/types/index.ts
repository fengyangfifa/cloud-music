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
  id: number;
  picId: number;
  picUrl: string;
  name: string;
}

export type Tracks = Array<{
  first: string;
  second: string;
}>;

interface RankListItem {
  id: number;
  name: string;
  coverImgUrl: string;
  coverImgId: number;
  updateFrequency: string;
  tracks: Tracks;
}

interface CreatorType {
  avatarUrl: string;
  nickname: string;
}

export interface TracksItem {
  id: number;
  name: string;
  artists?: Array<Record<"name", string>>;
  ar?: Array<Record<"name", string>>;
  al?: Record<"name", string>;
  album?: Record<"name", string>;
}

export interface AlbumType {
  creator: CreatorType;
  coverImgUrl: string;
  subscribedCount: number;
  name: string;
  tracks: Array<TracksItem>;
}

export interface ScrollHandle {
  refresh: () => void;
  getBScroll: () => void;
}

export interface ArtistType {
  name: string;
  picUrl: string;
}

export type SongsType = Array<TracksItem>;

export interface SingerType {
  artist: ArtistType;
  hotSongs: SongsType;
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
export type SingerList = Array<SingerListItem>;
export type RankList = Array<RankListItem>;
