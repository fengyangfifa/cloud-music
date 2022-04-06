import React from "react";
import style from "./loading.module.scss";

function Loading() {
  return (
    <div className={style["loading-wrapper"]}>
      <div />
      <div />
    </div>
  );
}

export default React.memo(Loading);
