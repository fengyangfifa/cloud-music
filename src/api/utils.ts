import { RankList } from "@/types";

export const getCount = (count: number) => {
  if (count < 0) return;

  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

export const debounce = (func: Function = () => {}, delay: number) => {
  let timer: number;

  return (...args: unknown[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func.apply(this, args);
      window.clearTimeout(timer);
    }, delay);
  };
};

export function findIndex(list: RankList) {
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      return i + 1;
    }
  }
}
