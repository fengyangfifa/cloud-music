import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";

import { ToastHandle } from "@/types";
import "./toast.scss";

interface ToastProps {
  text: string;
}

const Toast = forwardRef<ToastHandle, ToastProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<number>();
  const { text } = props;

  useImperativeHandle(ref, () => ({
    show: () => {
      if (timer) {
        window.clearTimeout(timer);
      }

      setShow(true);
      setTimer(
        window.setTimeout(() => {
          setShow(false);
        }, 3000)
      );
    }
  }));

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="drop"
      unmountOnExit={true}
    >
      <div className="toast-wrapper">
        <div className="toast-text">{text}</div>
      </div>
    </CSSTransition>
  );
});

export default Toast;
