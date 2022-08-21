// eslint-disable-next-line
import axios from "axios";

declare module "axios" {
  export interface AxiosStatic {
    extendVersion: number;
  }
  export interface AxiosRequestConfig {
    loading?: boolean;
  }
}
