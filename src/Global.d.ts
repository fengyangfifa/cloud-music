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
