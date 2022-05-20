import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ConfirmHandle } from "@/types";
import "./confirm.scss";

interface ConfirmProps {
  text: string;
  cancelBtnText: string;
  confirmBtnText: string;
  handleConfirm: () => void;
}

const Confirm = forwardRef<ConfirmHandle, ConfirmProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const { text, cancelBtnText, confirmBtnText, handleConfirm } = props;

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    }
  }));

  const onOk = () => {
    setShow(false);
    handleConfirm();
  };

  return (
    <CSSTransition
      classNames="confirm-fade"
      timeout={300}
      appear={true}
      in={show}
    >
      <div
        className="confirm-wrapper"
        style={{ display: show ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="confirm-content">
            <p className="text">{text}</p>
            <div className="operate">
              <div className="operate-btn left" onClick={() => setShow(false)}>
                {cancelBtnText}
              </div>
              <div className="operate-btn" onClick={onOk}>
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default React.memo(Confirm);
