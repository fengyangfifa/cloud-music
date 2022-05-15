import produce from "immer";

import {
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_SHOW_PLAYLIST,
  SET_PLAY_MODE,
  SET_PLAYLIST,
  SET_SEQUENCE_PLAYLIST,
  SET_PLAYING_STATE,
  SET_FULL_SCREEN
} from "./constants";
import { PlayMode, SongType } from "@/types";

export interface PlayerState {
  fullScreen: boolean;
  playing: boolean;
  sequencePlayList: Array<SongType>; //顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: Array<SongType>;
  mode: PlayMode;
  currentIndex: number;
  showPlayList: boolean;
  currentSong: SongType;
}

const song = {
  ftype: 0,
  djId: 0,
  a: null,
  cd: "01",
  crbt: null,
  no: 1,
  st: 0,
  rt: "",
  cf: "",
  alia: ["手游《梦幻花园》苏州园林版推广曲"],
  rtUrls: [],
  fee: 0,
  s_id: 0,
  copyright: 0,
  h: {
    br: 320000,
    fid: 0,
    size: 9400365,
    vd: -45814
  },
  mv: 0,
  al: {
    id: 84991301,
    name: "拾梦纪",
    picUrl:
      "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
    tns: [],
    pic_str: "109951164627180052",
    pic: 109951164627180050
  },
  name: "拾梦纪",
  l: {
    br: 128000,
    fid: 0,
    size: 3760173,
    vd: -41672
  },
  rtype: 0,
  m: {
    br: 192000,
    fid: 0,
    size: 5640237,
    vd: -43277
  },
  cp: 1416668,
  mark: 0,
  rtUrl: null,
  mst: 9,
  dt: 234947,
  ar: [
    {
      id: 12084589,
      name: "妖扬",
      tns: [],
      alias: []
    },
    {
      id: 12578371,
      name: "金天",
      tns: [],
      alias: []
    }
  ],
  pop: 5,
  pst: 0,
  t: 0,
  v: 3,
  id: 1416767593,
  publishTime: 0,
  rurl: null
};

const defaultState: PlayerState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    },
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "我好像在哪里见过你",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "我好像在哪里见过你",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 279000,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 417859631,
      publishTime: 0,
      rurl: null
    },
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "天分",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "天分",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 248000,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1334647784,
      publishTime: 0,
      rurl: null
    }
  ],
  playList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    },
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "我好像在哪里见过你",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "我好像在哪里见过你",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 279000,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 417859631,
      publishTime: 0,
      rurl: null
    },
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "天分",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050
      },
      name: "天分",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 248000,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1334647784,
      publishTime: 0,
      rurl: null
    }
  ],
  mode: PlayMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: song
};

const playerReducer = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case SET_CURRENT_SONG:
      state.currentSong = action.data;
      break;
    case SET_FULL_SCREEN:
      state.fullScreen = action.data;
      break;
    case SET_PLAYING_STATE:
      state.playing = action.data;
      break;
    case SET_SEQUENCE_PLAYLIST:
      state.sequencePlayList = action.data;
      break;
    case SET_PLAYLIST:
      state.playList = action.data;
      break;
    case SET_PLAY_MODE:
      state.mode = action.data;
      break;
    case SET_CURRENT_INDEX:
      state.currentIndex = action.data;
      break;
    case SET_SHOW_PLAYLIST:
      state.showPlayList = action.data;
      break;
  }
}, defaultState);

export default playerReducer;
