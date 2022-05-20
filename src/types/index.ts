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
  al?: {
    name: string;
    picUrl: string;
  };
  album?: Record<"name", string>;
  dt: number;
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

export enum PlayMode {
  sequence = 0,
  loop = 1,
  random = 2
}

export interface ProgressBarHandle {
  adjustment: () => void;
}

export interface ToastHandle {
  show: () => void;
}

export interface MusicNoteHandle {
  startAnimation: ({ x, y }: { x: number; y: number }) => void;
}

export interface ConfirmHandle {
  show: () => void;
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
export type SingerList = Array<SingerListItem>;
export type RankList = Array<RankListItem>;
