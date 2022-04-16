import React from "react";
import style from "./loading-v2.module.scss";

function LoadingV2() {
  return (
    <div className={style.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </div>
  );
}

export default React.memo(LoadingV2);
