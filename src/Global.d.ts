declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}
