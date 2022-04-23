import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";

import Header from "@/baseUI/header";
import "./album.scss";

function Album() {
  const history = useHistory();
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit={true}
      onExited={history.goBack}
    >
      <div className="container">
        <Header title={"返回"} handleClick={handleBack} />
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);
