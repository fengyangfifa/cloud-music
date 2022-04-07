import React, { useState } from "react";

import Horizon from "@/baseUI/horizon-item";
import { categoryTypes, alphaTypes } from "@/utils";
import style from "./singers.module.scss";

function Singers() {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
  };

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
  };

  return (
    <div className={style["nav-container"]}>
      <Horizon
        list={categoryTypes}
        title="分类 (默认热门):"
        oldVal={category}
        handleClick={handleUpdateCategory}
      />
      <Horizon
        list={alphaTypes}
        title="首字母:"
        oldVal={alpha}
        handleClick={handleUpdateAlpha}
      />
    </div>
  );
}

export default React.memo(Singers);
