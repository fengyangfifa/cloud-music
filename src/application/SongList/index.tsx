import React from "react";
import clsx from "clsx";

import { getCount, getName } from "@/utils";
import { TracksItem } from "@/types";
import "./song-list.scss";

interface SongListProps {
  showCollect: boolean;
  songs: Array<TracksItem>;
  showBackground?: boolean;
  collectCount?: number;
}

const SongList = React.forwardRef<HTMLDivElement, SongListProps>(
  (props, ref) => {
    const { collectCount, showCollect, songs, showBackground } = props;
    const totalCount = songs.length;

    const selectItem = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number
    ) => {
      console.log(index, e);
    };

    const songList = (list: Array<TracksItem>) => {
      return list.map((item, index) => {
        return (
          <li key={item.id} onClick={(e) => selectItem(e, index)}>
            <span className="index">{index + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                {item.ar ? getName(item.ar) : getName(item.artists || [])} -{" "}
                {item.al ? item.al.name : item.album?.name}
              </span>
            </div>
          </li>
        );
      });
    };

    const collect = (count: number) => {
      return (
        <div className="add-list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({getCount(count)})</span>
        </div>
      );
    };

    return (
      <div
        className={clsx("song-list", showBackground && "show-background")}
        ref={ref}
      >
        <div className="first-line">
          <div className="play-all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部 <span className="sum">(共 {totalCount} 首)</span>
            </span>
          </div>
          {showCollect ? collect(collectCount || 0) : null}
        </div>
        <ul className="song-item">{songList(songs)}</ul>
      </div>
    );
  }
);

export default React.memo(SongList);
