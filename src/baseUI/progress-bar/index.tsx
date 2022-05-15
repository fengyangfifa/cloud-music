import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle
} from "react";

import { ProgressBarHandle } from "@/types";
import "./progress-bar.scss";

interface ProgressBarProps {
  percent: number;
  percentChange: Function;
}

const PROGRESS_BTN_WIDTH = 16;

const ProgressBar = forwardRef<ProgressBarHandle, ProgressBarProps>(
  (props, ref) => {
    const { percent, percentChange } = props;

    const progressBar = useRef<HTMLDivElement>(null);
    const progressLine = useRef<HTMLDivElement>(null);
    const progressBtn = useRef<HTMLDivElement>(null);
    const [touch, setTouch] = useState({
      initiated: false,
      startX: 0,
      left: 0
    });

    // 处理进度条宽度和红点的偏移
    const _offset = useCallback((offsetWidth: number) => {
      const progressLineDom = progressLine.current;
      const progressBtnDom = progressBtn.current;
      if (!progressLineDom || !progressBtnDom) {
        return;
      }

      progressLineDom.style.width = `${offsetWidth}px`;
      progressBtnDom.style.transform = `translateX(${offsetWidth}px)`;
    }, []);

    const _changePercent = () => {
      const progressLineDom = progressLine.current;
      const progressBarDom = progressBar.current;
      if (!progressBarDom || !progressLineDom) {
        return;
      }

      const barWidth = progressBarDom.clientWidth - PROGRESS_BTN_WIDTH;
      const curPercent = progressLineDom.clientWidth / barWidth;
      percentChange(curPercent);
    };

    const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      const startTouch = {
        initiated: true, // true 表示滑动动作开始了
        startX: e.touches[0].pageX, // 滑动开始时横向坐标
        left: progressLine.current?.clientWidth || 0 // 当前 progress 长度
      };
      setTouch(startTouch);
    };

    const progressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (!touch.initiated || !progressBar.current) {
        return;
      }

      // 滑动距离
      const deltaX = e.touches[0].pageX - touch.startX;
      const barWidth = progressBar.current.clientWidth - PROGRESS_BTN_WIDTH;
      const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
      _offset(offsetWidth);
    };

    const progressTouchEnd = () => {
      const endTouch = { ...touch };
      endTouch.initiated = false;
      setTouch(endTouch);
      _changePercent();
    };

    const progressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBar.current) {
        return;
      }

      const rect = progressBar.current.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      _offset(offsetWidth);
      _changePercent();
    };

    useEffect(() => {
      if (!progressBar.current) {
        return;
      }

      if (percent >= 0 && percent <= 1 && !touch.initiated) {
        const barWidth = progressBar.current.clientWidth - PROGRESS_BTN_WIDTH;
        const offsetWidth = Math.min(Math.max(0, percent * barWidth), barWidth);
        _offset(offsetWidth);
      }
    }, [percent, _offset, touch.initiated]);

    useImperativeHandle(ref, () => ({
      adjustment: () => {
        if (!progressBar.current) {
          return;
        }

        const barWidth = progressBar.current.clientWidth - PROGRESS_BTN_WIDTH;
        const offsetWidth = Math.min(Math.max(0, percent * barWidth), barWidth);
        _offset(offsetWidth);
      }
    }));

    return (
      <div className="progress">
        <div
          className="progress-bar-inner"
          ref={progressBar}
          onClick={progressClick}
        >
          <div className="progress-line" ref={progressLine} />
          <div
            className="progress-btn-wrapper"
            ref={progressBtn}
            onTouchStart={progressTouchStart}
            onTouchMove={progressTouchMove}
            onTouchEnd={progressTouchEnd}
          >
            <div className="progress-btn" />
          </div>
        </div>
      </div>
    );
  }
);

export default React.memo(ProgressBar);
