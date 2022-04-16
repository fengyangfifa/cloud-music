import React, { FunctionComponent } from "react";
import clsx from "clsx";

import style from "./loading.module.scss";

interface LoadingProps {
  show?: boolean;
}

const Loading: FunctionComponent<LoadingProps> = (props: LoadingProps) => {
  const { show } = props;
  return (
    <div className={clsx(style["loading-wrapper"], !show && style.hidden)}>
      <div />
      <div />
    </div>
  );
};

Loading.defaultProps = {
  show: true
};

export default React.memo(Loading);
