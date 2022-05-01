import React from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";

import Home from "@/application/Home";
import Recommend from "@/application/Recommend";
import Singers from "@/application/Singers";
import Rank from "@/application/Rank";
import Album from "@/application/Album";
import Singer from "@/application/Singer";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => {
          return <Redirect to={"/recommend"} />;
        }
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: Singer
          }
        ]
      },
      {
        path: "/rank",
        component: Rank,
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      }
    ]
  }
];

export default routes;
