import React from "react";

import style from "./header.module.scss";

interface HeaderProps {
  handleClick?: () => unknown;
  title?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { handleClick, title } = props;

  return (
    <div className={style["header-container"]} ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </div>
  );
});

Header.defaultProps = {
  handleClick: () => {},
  title: "标题"
};

export default React.memo(Header);
