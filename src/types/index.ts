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

export enum PlayMode {
  sequence = 0,
  loop = 1,
  random = 2
}

export interface SongType {
  ftype: number;
  djId: number;
  a: null;
  cd: string;
  crbt: null;
  no: number;
  st: number;
  rt: string;
  cf: string;
  alia: Array<string>;
  rtUrls: Array<string>;
  fee: number;
  s_id: number;
  copyright: number;
  h: {
    br: number;
    fid: number;
    size: number;
    vd: number;
  };
  mv: number;
  al: {
    id: number;
    name: string;
    picUrl: string;
    tns: Array<string>;
    pic_str: string;
    pic: number;
  };
  name: string;
  l: {
    br: number;
    fid: number;
    size: number;
    vd: number;
  };
  rtype: number;
  m: {
    br: number;
    fid: number;
    size: number;
    vd: number;
  };
  cp: number;
  mark: number;
  rtUrl: null;
  mst: number;
  dt: number;
  ar: Array<{
    id: number;
    name: string;
    tns: Array<string>;
    alias: Array<string>;
  }>;
  pop: number;
  pst: number;
  t: number;
  v: number;
  id: number;
  publishTime: number;
  rurl: null;
}

export interface ProgressBarHandle {
  adjustment: () => void;
}

export type BannerList = Array<BannerListItem>;
export type RecommendList = Array<RecommendListItem>;
export type SingerList = Array<SingerListItem>;
export type RankList = Array<RankListItem>;
