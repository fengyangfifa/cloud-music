import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import Slider from "@/components/slider";
import RecommendList from "@/components/list";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import { getBannerList, getRecommendList } from "./store/actionCreators";
import { RootState } from "@/store";

import style from "./recommend.module.scss";

function Recommend(props: Partial<RouteConfigComponentProps>) {
  const { bannerList, recommendList, enterLoading } = useSelector(
    (state: RootState) => {
      return state.recommend;
    }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerList());
    }
  }, [dispatch, bannerList]);
  useEffect(() => {
    if (!recommendList.length) {
      dispatch(getRecommendList());
    }
  }, [dispatch, recommendList]);

  return (
    <div className={style["content"]}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
      {renderRoutes(props.route?.routes)}
    </div>
  );
}

export default React.memo(Recommend);
