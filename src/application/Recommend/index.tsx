import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../baseUI/scroll";

import {
  getBannerList,
  getRecommendList
} from "./store/actionCreators";
import {RootState} from "@/store";

import style from "./recommend.module.scss";

function Recommend() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerList());
    dispatch(getRecommendList());
  }, [dispatch]);

  const {bannerList, recommendList} = useSelector((state: RootState) => {
    return state.recommend;
  });

  return (
    <div className={style["content"]}>
      <Scroll>
        <div>
          <Slider bannerList={bannerList}/>
          <RecommendList recommendList={recommendList}/>
        </div>
      </Scroll>
    </div>
  );
}

export default React.memo(Recommend);
