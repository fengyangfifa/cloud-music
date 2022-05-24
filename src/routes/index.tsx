import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";

const Home = lazy(() => import("@/application/Home"));
const Singers = lazy(() => import("@/application/Singers"));
const Rank = lazy(() => import("@/application/Rank"));
const Album = lazy(() => import("@/application/Album"));
const Singer = lazy(() => import("@/application/Singer"));
const Recommend = lazy(() => import("@/application/Recommend"));

const SuspenseComponent =
  (Component: React.LazyExoticComponent<any>) => (props: any) => {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
  };

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: SuspenseComponent(Home),
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
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: "/singers",
        component: SuspenseComponent(Singers),
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: SuspenseComponent(Singer)
          }
        ]
      },
      {
        path: "/rank",
        component: SuspenseComponent(Rank),
        key: "rank",
        routes: [
          {
            path: "/rank/:id",
            component: SuspenseComponent(Album)
          }
        ]
      }
    ]
  }
];

export default routes;
