import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle
} from "react";

import { MusicNoteHandle } from "@/types";
import "./music-note.scss";

type IconDom = HTMLElement & {
  running: boolean;
};

const MusicNote = forwardRef<MusicNoteHandle>((props, ref) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
  const ICON_NUMBER = 3;

  // 原生 DOM 操作，返回一个 DOM 节点对象
  const createNode = (txt: string) => {
    const template = `<div class="icon-wrapper">${txt}</div>`;
    const tempNode = document.createElement("div");
    tempNode.innerHTML = template;

    return tempNode.firstChild as HTMLElement;
  };

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      const node = createNode("<div class='iconfont'>&#xe642;</div>");
      iconsRef.current && iconsRef.current.appendChild(node);
    }

    const domArray: Array<IconDom> = [].slice.call(iconsRef.current?.children);
    domArray.forEach((item) => {
      item.running = false;
      item.addEventListener("transitionend", function () {
        this.style["display"] = "none";
        this.style["transform"] = "translate3d(0, 0, 0)";
        (this as IconDom).running = false;

        const icon = this.querySelector("div");
        if (icon) {
          icon.style["transform"] = "translate3d(0, 0, 0)";
        }
      });
    });
  }, []);

  const startAnimation = ({ x, y }: { x: number; y: number }) => {
    const domArray: Array<IconDom> = [].slice.call(iconsRef.current?.children);
    for (let i = 0; i < ICON_NUMBER; i++) {
      const item = domArray[i];

      // 选择一个空闲的元素来开始动画
      if (!item.running) {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";

        window.setTimeout(() => {
          item.running = true;
          item.style.transform = "translate3d(0, 750px, 0)";
          const icon = item.querySelector("div");
          if (icon) {
            icon.style.transform = "translate3d(-40px, 0, 0)";
          }
        }, 20);

        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation
  }));

  return <div className="music-note-container" ref={iconsRef} />;
});

export default React.memo(MusicNote);
