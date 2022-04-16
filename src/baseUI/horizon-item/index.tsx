import React, { memo, FunctionComponent } from "react";
import clsx from "clsx";

import Scroll from "@/baseUI/scroll";
import style from "./horizon.module.scss";

interface HorizonProps {
  list: Array<{ name: string; key: string }>;
  title: string;
  oldVal?: string;
  handleClick?: (val: string) => void;
}

const Horizon: FunctionComponent<HorizonProps> = (props) => {
  const { list, oldVal, title, handleClick } = props;

  return (
    <Scroll direction={"horizental"}>
      <div className={style.list}>
        <span>{title}</span>
        {list.map((item) => {
          const selected = oldVal === item.key && style.selected;
          return (
            <span
              className={clsx(style["list-item"], selected)}
              key={item.key}
              onClick={() => handleClick && handleClick(item.key)}
            >
              {item.name}
            </span>
          );
        })}
      </div>
    </Scroll>
  );
};

Horizon.defaultProps = {
  list: [],
  title: ""
};

export default memo(Horizon);
