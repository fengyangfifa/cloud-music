declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.png" {
  const content: string;
  export default content;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

declare module "create-keyframe-animation" {
  interface RegisterAnimationConfig {
    name: string;
    animation: Record<string, Record<string, string>>;
    presets: {
      duration: number;
      easing: "linear";
    };
  }

  const animations: {
    registerAnimation: (opts: RegisterAnimationConfig) => void;
    runAnimation: (
      els: HTMLElement | HTMLElement[],
      opts: string,
      cb?: Function
    ) => void;
    unregisterAnimation: (name: string) => void;
  };
  export default animations;
}
