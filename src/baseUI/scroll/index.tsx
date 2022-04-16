import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  FunctionComponent,
  useMemo
} from "react";
import BScroll from "better-scroll";
import clsx from "clsx";

import Loading from "@/baseUI/loading";
import LoadingV2 from "@/baseUI/loading-v2";
import { debounce } from "@/api/utils";
import style from "./scroll.module.scss";

type ScrollProps = {
  direction?: "vertical" | "horizental";
  click?: boolean;
  refresh?: boolean;
  onScroll?: (a: unknown) => void;
  pullUp?: Function;
  pullDown?: Function;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  bounceTop?: boolean; // 是否支持向上吸顶
  bounceBottom?: boolean; // 是否支持向上吸顶
};

const Scroll: FunctionComponent<ScrollProps> = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    direction,
    click,
    refresh,
    bounceTop,
    bounceBottom,
    pullUp,
    pullDown,
    onScroll,
    pullDownLoading,
    pullUpLoading
  } = props;

  const pullUpDebounce = useMemo(() => {
    if (pullUp) {
      return debounce(pullUp, 300);
    }
    return () => {};
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    if (pullDown) {
      return debounce(pullDown, 300);
    }
    return () => {};
  }, [pullDown]);

  useEffect(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      },
      mouseWheel: true
    });
    setBScroll(scroll);

    return () => {
      setBScroll(undefined);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;

    bScroll.on("scroll", (scroll: unknown) => {
      onScroll(scroll);
    });

    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll) return;

    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });

    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll) return;

    bScroll.on("touchEnd", (pos: Record<string, number>) => {
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });

    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDownDebounce, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },

    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <div className={style["scroll-container"]} ref={scrollContainerRef}>
      {props.children}
      <div
        className={clsx(
          style["pull-up-loading"],
          !pullUpLoading && style.hidden
        )}
      >
        <Loading />
      </div>
      <div
        className={clsx(
          style["pull-down-loading"],
          !pullDownLoading && style.hidden
        )}
      >
        <LoadingV2 />
      </div>
    </div>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: () => {},
  pullUp: () => {},
  pullDown: () => {},
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
