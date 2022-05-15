import React from "react";

import "./progress-circle.scss";

interface ProgressCircleProps {
  radius: number;
  percent: number;
}

function ProgressCircle(props: React.PropsWithChildren<ProgressCircleProps>) {
  const { radius, percent } = props;

  // 整个背景的周长，圆的半径 50
  const dasharray = Math.PI * 2 * 50;

  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dasharray;

  return (
    <div className="circle">
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dasharray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {props.children}
    </div>
  );
}

export default React.memo(ProgressCircle);
