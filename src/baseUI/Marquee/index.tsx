import React, { FunctionComponent, useEffect, useRef } from "react";

import "./marquee.scss";
import { useMountedRef } from "@/utils/customHooks";

interface MarqueeProps {
  duration?: number; // 跑马灯时间 ms
}

// 默认 duration 时间
const DEFAULT_DURATION = 6 * 1000;

const Marquee: FunctionComponent<MarqueeProps> = (props) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useMountedRef();

  const { duration = DEFAULT_DURATION } = props;

  useEffect(() => {
    const marqueeDom = marqueeRef.current;
    const containerDom = containerRef.current;

    if (!marqueeDom || !containerDom) {
      return;
    }

    function setPosition(dom: HTMLElement, clientX: number) {
      dom.style.transform = `translateX(${clientX}px)`;
    }

    // 文本初始位于最右侧
    const initialX = marqueeDom.clientWidth;
    // 文本需要运动的整体距离
    const total = marqueeDom.clientWidth + containerDom.clientWidth;
    // 计算每 ms，运动多少 px
    const speed = total / duration;

    setPosition(containerDom, initialX);

    let start = 0;
    function step(timestamp: number) {
      if (start === 0) {
        start = timestamp;
      }

      // 计算目前应该运动到的 px
      const elapsed = timestamp - start;
      const curX = initialX - elapsed * speed;
      if (containerDom) {
        setPosition(containerDom, curX);
      }

      // 时间超过 duration 后应该重新开始跑马灯
      if (elapsed >= duration) {
        start = 0;
      }

      // 组件处于挂载时，才调用 window.requestAnimationFrame
      if (mountedRef.current) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, [duration, containerRef, marqueeRef, mountedRef]);

  return (
    <div className="marquee" ref={marqueeRef}>
      <div className="marquee-container" ref={containerRef}>
        {props.children}
      </div>
    </div>
  );
};

export default Marquee;
