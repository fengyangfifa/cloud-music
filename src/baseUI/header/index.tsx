import React from "react";

import Marquee from "@/baseUI/marquee";
import style from "./header.module.scss";

interface HeaderProps {
  handleClick?: () => unknown;
  title?: string;
  isMarquee?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { handleClick, title, isMarquee } = props;

  return (
    <div className={style["header-container"]} ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <Marquee>
          <h1>{title}</h1>
        </Marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
});

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

export default React.memo(Header);
