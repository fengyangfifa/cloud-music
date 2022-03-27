import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  FunctionComponent
} from "react";
import BScroll from "better-scroll";

import style from "./scroll.module.scss";

type ScrollProps = {
  direction?: "vertical" | "horizental",
  click?: boolean,
  refresh?: boolean,
  onScroll?: (a: unknown) => void,
  pullUp?: () => void,
  pullDown?: () => void,
  pullUpLoading?: boolean,
  pullDownLoading?: boolean,
  bounceTop?: boolean, // 是否支持向上吸顶
  bounceBottom?: boolean // 是否支持向上吸顶
}


const Scroll: FunctionComponent<ScrollProps> = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {direction, click, refresh, bounceTop, bounceBottom, pullUp, pullDown, onScroll} = props;

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
    if (!pullUp || !bScroll) return;

    bScroll.on("scrollEnd", () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });

    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;

    bScroll.on("touchEnd", (pos: Record<string, number>) => {
      if (pos.y > 50) {
        pullDown();
      }
    });

    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

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
    </div>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: () => {
  },
  pullUp: () => {
  },
  pullDown: () => {
  },
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
