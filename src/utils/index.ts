import { RankList } from "@/types";

export type GetKeyType<
  T extends string,
  R extends Record<string, unknown>
> = T extends keyof R ? R[T] : unknown;

export type CreateActionType<T, R> = {
  type: T;
  data?: R;
};

export function createAction<T, R>(type: T, data?: R) {
  return {
    type,
    data
  };
}

export const categoryTypes = [
  {
    name: "华语男",
    key: "1001"
  },
  {
    name: "华语女",
    key: "1002"
  },
  {
    name: "华语组合",
    key: "1003"
  },
  {
    name: "欧美男",
    key: "2001"
  },
  {
    name: "欧美女",
    key: "2002"
  },
  {
    name: "欧美组合",
    key: "2003"
  },
  {
    name: "日本男",
    key: "6001"
  },
  {
    name: "日本女",
    key: "6002"
  },
  {
    name: "日本组合",
    key: "6003"
  },
  {
    name: "韩国男",
    key: "7001"
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  }
];

export const categoryMap = new Map([
  ["1001", { type: 1, area: 7 }],
  ["1002", { type: 2, area: 7 }],
  ["1003", { type: 3, area: 7 }],
  ["2001", { type: 1, area: 96 }],
  ["2002", { type: 2, area: 96 }],
  ["2003", { type: 3, area: 96 }],
  ["6001", { type: 1, area: 8 }],
  ["6002", { type: 2, area: 8 }],
  ["6003", { type: 3, area: 8 }],
  ["7001", { type: 1, area: 16 }],
  ["7002", { type: 2, area: 16 }],
  ["7003", { type: 3, area: 16 }],
  ["4001", { type: 1, area: 0 }],
  ["4002", { type: 2, area: 0 }],
  ["4003", { type: 3, area: 0 }]
]);

// 歌手首字母
export const alphaTypes = [
  {
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

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

export const getName = (list: Array<Record<"name", string>>) => {
  return list.reduce((pre, cur, index) => {
    pre += index === 0 ? cur.name : `/${cur.name}`;
    return pre;
  }, "");
};

export const isEmptyObject = (obj: Record<any, any>) => {
  return Object.keys(obj).length === 0;
};

export const HEADER_HEIGHT = 45;

const vendor = (() => {
  const transformNames = {
    webkit: "webkitTransform", // safari、chrome
    Moz: "MozTransform", // firefox
    O: "OTransform", // opera
    ms: "msTransform", // ie
    standard: "Transform"
  };

  const el = document.documentElement || document.createElement("div");
  const elementStyle = el.style;
  for (const [key, value] of Object.entries(transformNames)) {
    // 骗过 ts 检查
    if (elementStyle[value as unknown as number] !== undefined) {
      return key;
    }
  }

  return "standard";
})();

export function prefixStyle(styleProperty: string) {
  if (vendor === "standard") {
    return styleProperty;
  }

  return (
    vendor + styleProperty.charAt(0).toUpperCase() + styleProperty.substring(1)
  );
}
